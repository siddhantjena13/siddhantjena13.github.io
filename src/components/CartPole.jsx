import { FAINT, INK, MUTED, RULE } from "../contact";

/**
 * CartPole-v1, the control task every algorithm in rl-from-scratch is
 * evaluated on. The pole tips first, the cart chases it, the lean comes back
 * toward vertical — the phase lag between the two keyframe tracks is what
 * makes it read as a controller correcting rather than a pendulum swinging.
 */
export default function CartPole() {
  return (
    <svg
      viewBox="0 0 640 250"
      role="img"
      aria-label="Animation of a cart sliding left and right to balance an upright pole, the CartPole-v1 control task."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* rail */}
      <line x1="40" y1="212" x2="600" y2="212" stroke={RULE} strokeWidth="1.5" />
      {[40, 180, 320, 460, 600].map((x) => (
        <line key={x} x1={x} y1="212" x2={x} y2="220" stroke={RULE} strokeWidth="1.5" />
      ))}
      {/* centre mark — the target the controller is holding */}
      <line x1="320" y1="204" x2="320" y2="222" stroke={FAINT} strokeWidth="1.5" />

      <g className="cp-cart">
        {/* pole pivots at the top centre of the cart */}
        <g className="cp-pole" style={{ transformOrigin: "320px 164px" }}>
          <line
            x1="320" y1="164" x2="320" y2="56"
            stroke={INK} strokeWidth="6" strokeLinecap="round"
          />
          <circle cx="320" cy="52" r="9" fill={INK} />
        </g>

        <rect x="277" y="164" width="86" height="32" rx="5" fill={MUTED} />
        <circle cx="298" cy="204" r="8" fill={INK} />
        <circle cx="342" cy="204" r="8" fill={INK} />
        {/* pivot cap, drawn last so it sits over the pole root */}
        <circle cx="320" cy="164" r="4" fill="#e6edf2" stroke={INK} strokeWidth="2" />
      </g>
    </svg>
  );
}
