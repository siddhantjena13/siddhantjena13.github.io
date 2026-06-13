import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import UI from "./UI";

export default function Robot({ active, onEnter, onExit }) {
  const group = useRef();
  const head = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Gentle idle float for the whole rig
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.05;
    }

    // Head tracks the cursor while idle, locks dead-center once zoomed in
    if (head.current) {
      const tx = active ? 0 : THREE.MathUtils.clamp(state.pointer.y * 0.22, -0.22, 0.22);
      const ty = active ? 0 : THREE.MathUtils.clamp(state.pointer.x * 0.38, -0.38, 0.38);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -tx, 0.08);
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, ty, 0.08);
    }
  });

  // Clicking the robot toggles: enter when idle, exit when zoomed in.
  const toggle = (e) => {
    e.stopPropagation();
    active ? onExit() : onEnter();
  };

  const hoverLift = hovered && !active ? 0.03 : 0;

  return (
    <group
      ref={group}
      onPointerOver={() => !active && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* ---------- BODY ---------- */}
      <group position={[0, 0.2 + hoverLift, 0]} onClick={toggle}>
        <RoundedBox args={[1.1, 1.0, 0.7]} radius={0.18} smoothness={6} castShadow>
          <meshStandardMaterial color="#cdd6df" metalness={0.4} roughness={0.5} />
        </RoundedBox>
        {/* chest indicator */}
        <mesh position={[0, 0.05, 0.36]}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial color="#58d5f2" emissive="#58d5f2" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ---------- HEAD ---------- */}
      <group ref={head} position={[0, 1.32 + hoverLift, 0]}>
        <RoundedBox args={[1.5, 1.15, 0.8]} radius={0.22} smoothness={6} castShadow onClick={toggle}>
          <meshStandardMaterial color="#dfe7ee" metalness={0.45} roughness={0.45} />
        </RoundedBox>

        {/* ears */}
        {[-0.82, 0.82].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} onClick={toggle}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
            <meshStandardMaterial color="#aab4bf" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}

        {/* antenna */}
        <mesh position={[0, 0.72, 0]} onClick={toggle}>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
          <meshStandardMaterial color="#aab4bf" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.93, 0]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color="#58d5f2" emissive="#58d5f2" emissiveIntensity={1.4} />
        </mesh>

        {/* ---------- VISOR: solid matte deep black, slightly recessed ---------- */}
        <RoundedBox args={[1.2, 0.84, 0.06]} radius={0.1} smoothness={6} position={[0, 0, 0.4]}>
          {/* roughness ~1 + low metalness = no specular glare circle */}
          <meshStandardMaterial color="#05070a" metalness={0.05} roughness={1} />
        </RoundedBox>

        {/*
          THE SCREEN — drei <Html transform> mounted a hair in front of the visor.
          `scale` is the one knob to eyeball: bump it up to make the UI fill more
          of the matte panel, down if it spills past the bezel. Content is authored
          in CSS pixels inside <UI/>; this maps it into world space.
        */}
       <Html
          transform
          position={[0, 0, 0.45]}
          scale={0.16}
          zIndexRange={[20, 0]}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (!active) {
                if (typeof onEnter === 'function') onEnter();
                else if (typeof props !== 'undefined' && props.onEnter) props.onEnter();
              }
            }}
            style={{ 
              width: "300px",
              height: "212px",
              cursor: active ? "default" : "pointer" 
            }}
          >
            <div style={{ pointerEvents: active ? "auto" : "none", width: "100%", height: "100%" }}>
              <UI active={active} onEnter={typeof onEnter === 'function' ? onEnter : (typeof props !== 'undefined' ? props.onEnter : null)} />
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
