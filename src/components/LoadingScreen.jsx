import { useEffect, useState } from "react";

/**
 * Self-contained loading screen. Independent of Three's loading manager:
 * the ring draws itself to completion over `duration` ms, then the whole
 * overlay fades out and calls onDone so the parent can unmount it.
 */
export default function LoadingScreen({ onDone, duration = 1300 }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), duration); // ring finished
    const t2 = setTimeout(() => onDone && onDone(), duration + 480); // after fade
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onDone]);

  const R = 26;
  const C = 2 * Math.PI * R;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        background: "#f4f5f2",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.46s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes ls-fill { from { stroke-dashoffset: ${C}; } to { stroke-dashoffset: 0; } }
        @keyframes ls-spin { to { transform: rotate(360deg); } }
      `}</style>

      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        style={{ animation: "ls-spin 1.1s linear infinite" }}
      >
        {/* track */}
        <circle cx="36" cy="36" r={R} fill="none" stroke="#e2e5df" strokeWidth="4" />
        {/* progress arc that completes itself */}
        <circle
          cx="36"
          cy="36"
          r={R}
          fill="none"
          stroke="#101217"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
          transform="rotate(-90 36 36)"
          style={{ animation: `ls-fill ${duration}ms cubic-bezier(0.65,0,0.35,1) forwards` }}
        />
      </svg>

      <div
        style={{
          fontFamily: '"Schibsted Grotesk", system-ui, sans-serif',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#8b93a3",
        }}
      >
        Loading
      </div>
    </div>
  );
}
