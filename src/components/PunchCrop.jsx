import { CYAN, FAINT, INK, MONO, RULE } from "../contact";

/**
 * What the punch classifier actually sees. Each annotated punch becomes a
 * 16-frame clip cropped to the attacker, so the attacker is drawn solid and
 * inside the crop box while the defender — whose hands are what make a punch
 * a block rather than a landed shot — sits faded and outside it. The figure is
 * the argument the caption makes: the weakest class is the one whose evidence
 * falls off the edge of the crop.
 */

const CROP = { x: 174, y: 40, w: 158, h: 164 };

const TICKS = Array.from({ length: 16 }, (_, i) => i);
const TICK_PITCH = CROP.w / 16;

// L-shaped corner marks, drawn per corner as [dx, dy] direction pairs.
const CORNERS = [
  { x: CROP.x, y: CROP.y, dx: 1, dy: 1 },
  { x: CROP.x + CROP.w, y: CROP.y, dx: -1, dy: 1 },
  { x: CROP.x + CROP.w, y: CROP.y + CROP.h, dx: -1, dy: -1 },
  { x: CROP.x, y: CROP.y + CROP.h, dx: 1, dy: -1 },
];
const ARM = 16;

export default function PunchCrop() {
  return (
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-label="A boxer throwing a punch, enclosed in a dashed crop box labelled 224 by 224, with the defending boxer faded and falling outside the box, above a strip of 16 frames."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* video frame the clip is cut from */}
      <rect x="18" y="12" width="604" height="200" rx="4" fill="#e6edf2" stroke={RULE} strokeWidth="1" />
      <line x1="30" y1="196" x2="610" y2="196" stroke={RULE} strokeWidth="1.5" />

      {/* defender — faded, because the crop never reaches them */}
      <g stroke={FAINT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M422 84 L414 136" />
        <path d="M414 136 L442 192" />
        <path d="M414 136 L388 188" />
        <path d="M418 96 L394 108 L376 88" />
        <path d="M420 100 L400 120 L384 104" />
      </g>
      <circle cx="424" cy="70" r="13" fill={FAINT} />
      <circle cx="370" cy="86" r="10" fill={FAINT} />
      <circle cx="382" cy="104" r="10" fill={FAINT} />

      {/* attacker — steps into the punch, and stays inside the crop */}
      <g className="bx-attacker">
        <g stroke={INK} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M222 86 L232 136" />
          <path d="M232 136 L206 192" />
          <path d="M232 136 L264 188" />
          <path d="M228 98 L202 122 L210 100" />
          <path d="M230 100 L268 97 L288 95" />
        </g>
        <circle cx="220" cy="72" r="13" fill={INK} />
        <circle cx="208" cy="98" r="8.5" fill={INK} />
        <circle cx="296" cy="95" r="12" fill={INK} />
      </g>

      {/* the crop: what the model is handed */}
      <g className="bx-brackets">
        <rect
          x={CROP.x} y={CROP.y} width={CROP.w} height={CROP.h}
          fill="none" stroke={CYAN} strokeWidth="1" strokeDasharray="3 5" opacity="0.55"
        />
        {CORNERS.map((c) => (
          <path
            key={`${c.x}-${c.y}`}
            d={`M${c.x + c.dx * ARM} ${c.y} H${c.x} V${c.y + c.dy * ARM}`}
            fill="none" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
        ))}
      </g>

      <text x={CROP.x} y="32" fontFamily={MONO} fontSize="11" fill={CYAN} letterSpacing="0.06em">
        crop 224×224
      </text>
      <text x="424" y="32" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={FAINT} letterSpacing="0.04em">
        outside crop
      </text>

      {/* the 16 frames sampled from the clip */}
      {TICKS.map((i) => (
        <rect
          key={i}
          x={CROP.x + i * TICK_PITCH} y="232" width="7.5" height="14" rx="1.5"
          fill="#d5dee6"
        />
      ))}
      <rect className="bx-playhead" x={CROP.x} y="232" width="7.5" height="14" rx="1.5" fill={CYAN} />
      <text x="344" y="243" fontFamily={MONO} fontSize="10.5" fill={FAINT} letterSpacing="0.04em">
        16 frames sampled per punch
      </text>
    </svg>
  );
}
