import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Two camera poses, damped between on every frame.
 *
 * IDLE   — the whole robot is in frame.
 * ACTIVE — nose-to-visor, but pulled back *just* enough that the rounded
 *          head edges stay in frame and read as a bezel around the screen.
 *
 * If the screen ends up too tight or too loose when zoomed in, nudge
 * ACTIVE_POS.z (smaller = closer / more bezel cropped out).
 */
const IDLE_POS = new THREE.Vector3(0, 1.1, 6);
const IDLE_LOOK = new THREE.Vector3(0, 1.0, 0);
const ACTIVE_POS = new THREE.Vector3(0, 1.32, 1.95);
const ACTIVE_LOOK = new THREE.Vector3(0, 1.32, 0);

export default function CameraRig({ active }) {
  const { camera } = useThree();
  const look = useRef(IDLE_LOOK.clone());

  useFrame((_, dt) => {
    const targetPos = active ? ACTIVE_POS : IDLE_POS;
    const targetLook = active ? ACTIVE_LOOK : IDLE_LOOK;
    const lambda = 3.4; // higher = snappier

    // Position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, lambda, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, lambda, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, lambda, dt);

    // Look target (damped separately so the turn feels smooth, not snappy)
    look.current.x = THREE.MathUtils.damp(look.current.x, targetLook.x, lambda, dt);
    look.current.y = THREE.MathUtils.damp(look.current.y, targetLook.y, lambda, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, targetLook.z, lambda, dt);

    camera.lookAt(look.current);
  });

  return null;
}
