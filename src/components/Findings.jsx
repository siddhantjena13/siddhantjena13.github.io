import { FAINT, INK, MONO, MUTED } from "../contact";

const ERROR = "#b5544a";
const WARN = "#9a7b3f";

// Shape and wording follow the sample report in the anonlint README.
const FINDINGS = [
  {
    level: "ERROR",
    color: ERROR,
    rule: "metadata.pdf_author",
    where: "",
    detail: '/Author field contains "Jane Smith"',
    fix: "exiftool -Author= paper.pdf",
  },
  {
    level: "WARNING",
    color: WARN,
    rule: "cite.self_reference",
    where: "p.4, ch.210",
    detail: '"in our previous work [7]"',
    fix: "rephrase as third-person citation",
  },
  {
    level: "WARNING",
    color: WARN,
    rule: "path.local_absolute",
    where: "fig3.tex",
    detail: "/Users/jsmith/uw-thesis/figure3.png",
    fix: "copy into ./figures and use a relative path",
  },
];

export default function Findings() {
  return (
    <div className="pj-report">
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11.5,
          color: MUTED,
          paddingBottom: "0.9rem",
          marginBottom: "1.1rem",
          borderBottom: "1px solid #d5dee6",
        }}
      >
        <span style={{ color: FAINT }}>$</span> anonlint paper.pdf --venue iclr-2027
      </div>

      {FINDINGS.map((f) => (
        <div key={f.rule} className="pj-finding">
          <span
            className="pj-level"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              color: f.color,
              letterSpacing: "0.08em",
            }}
          >
            {f.level}
          </span>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: MONO, fontSize: 11.5, color: INK, wordBreak: "break-word" }}>
              {f.rule}
              {f.where && <span style={{ color: FAINT }}> · {f.where}</span>}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11.5,
                color: MUTED,
                marginTop: 3,
                wordBreak: "break-word",
              }}
            >
              {f.detail}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: FAINT,
                marginTop: 3,
                wordBreak: "break-word",
              }}
            >
              fix: {f.fix}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
