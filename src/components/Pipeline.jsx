import { FAINT, INK, MONO, MUTED } from "../contact";

// Built in HTML rather than SVG so the labels stay legible when the row
// collapses to a column on narrow screens (see .pj-pipeline in projects.css).
const STAGES = [
  { label: "Hospital MRF", note: "published file" },
  { label: "Conditional fetch", note: "ETag · backoff" },
  { label: "CMS validation", note: "spec version" },
  { label: "History", note: "append-only" },
  { label: "Open API", note: "public record" },
];

export default function Pipeline() {
  return (
    <div className="pj-pipeline">
      {STAGES.map((stage, i) => (
        <div key={stage.label} className="pj-stage-wrap">
          <div className="pj-stage">
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 400,
                color: INK,
                letterSpacing: "0.01em",
              }}
            >
              {stage.label}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                color: FAINT,
                marginTop: 5,
                letterSpacing: "0.02em",
              }}
            >
              {stage.note}
            </div>
          </div>
          {i < STAGES.length - 1 && (
            <div className="pj-arrow" aria-hidden="true" style={{ color: MUTED }}>
              <span className="pj-arrow-h">→</span>
              <span className="pj-arrow-v">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
