import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Robot from "./components/Robot";
import CameraRig from "./components/CameraRig";

const CONTACT = {
  email: "siddhantjena13@gmail.com",
  linkedin: "https://www.linkedin.com/in/siddhantjena13", 
  github: "https://github.com/siddhantjena13",
};

const SANS = '"Inter", system-ui, sans-serif';

function useFonts() {
  useEffect(() => {
    const id = "custom-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    // Loading Inter for the overlay and Fira Code for the terminal
    link.href =
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&family=Inter:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

function CustomLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#e6edf2'
      }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <motion.circle
          cx="30" cy="30" r="26" fill="transparent" stroke="#1b1e26"
          strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  )
}

function Overlay() {
  const linkStyle = {
    fontFamily: SANS, fontSize: 12, fontWeight: 400,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: "#5b6472", textDecoration: "none",
  };
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', position: 'absolute', left: '1.5rem', top: '1.5rem' }}>
        <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 300, color: "#1b1e26", letterSpacing: "0.02em" }}>
          Siddhant Jena
        </div>
        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 300, color: "#8b93a3", marginTop: 4, letterSpacing: "0.05em" }}>
          CS · UW Allen School
        </div>
      </div>
      <div style={{ pointerEvents: 'auto', position: 'absolute', right: '1.5rem', top: '1.8rem', display: 'flex', gap: '1.5rem' }}>
        <a style={linkStyle} href={`mailto:${CONTACT.email}`}>Email</a>
        <a style={linkStyle} href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a style={linkStyle} href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  );
}

export default function App() {
  useFonts();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#e6edf2' }}>
      <AnimatePresence>{loading && <CustomLoader />}</AnimatePresence>
      <Suspense fallback={null}>
        <Canvas
          shadows dpr={[1, 2]}
          camera={{ position: [0, 1.1, 6], fov: 42, near: 0.1, far: 100 }}
          onPointerMissed={() => active && setActive(false)}
        >
          <color attach="background" args={["#e6edf2"]} />
          <hemisphereLight intensity={0.6} groundColor="#b8c2cc" />
          <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#9fd8ff" />
          <Suspense fallback={null}>
            <Robot active={active} onEnter={() => setActive(true)} />
          </Suspense>
          <ContactShadows position={[0, -0.55, 0]} opacity={0.5} scale={7} blur={2.6} far={3.5} resolution={1024} color="#1b2733" />
          <CameraRig active={active} />
        </Canvas>
      </Suspense>
      <Overlay />
      <div 
        style={{ 
          pointerEvents: 'none', position: 'absolute', bottom: '1.5rem', left: 0, right: 0, 
          display: 'flex', justifyContent: 'center', opacity: active ? 0 : 0.8,
          transition: 'opacity 0.5s ease', fontFamily: '"Fira Code", monospace',
          fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.35em', color: '#8b93a3'
        }}
      >
        click the robot button
      </div>
    </div>
  );
}