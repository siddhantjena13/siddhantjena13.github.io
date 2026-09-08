import CartPole from "../components/CartPole";
import Findings from "../components/Findings";
import Pipeline from "../components/Pipeline";
import { CONTACT, CYAN, FAINT, INK, MONO, MUTED, RULE, SANS } from "../contact";

const SECTIONS = [
  {
    key: "Reinforcement Learning",
    projects: [
      {
        title: "rl-from-scratch",
        meta: "Python · NumPy",
        body:
          "Four policy gradient algorithms — REINFORCE, a learned baseline, A2C, and PPO — implemented from scratch in NumPy on CartPole-v1, with every gradient derived by hand. No autograd and no RL library: the backward passes are written out. Each algorithm is a single file, so the diff between two consecutive files is the algorithm changing and nothing else.",
        visual: <CartPole />,
        caption:
          "CartPole-v1, the control task all four are benchmarked on. Across 3 seeds, PPO with GAE solved 3/3 — the same code with a single-step TD advantage solved 0/3.",
        repo: "https://github.com/siddhantjena13/rl-from-scratch",
      },
    ],
  },
  {
    key: "Software Engineering",
    projects: [
      {
        title: "mrf-watch",
        meta: "Python · CMS spec",
        body:
          "Federal law requires every US hospital to publish a machine-readable file listing its prices, including rates negotiated privately with insurers. Enforcement is periodic and complaint-driven, so no continuous public record of compliance exists. mrf-watch fetches each hospital's file, validates it against the required format, and records the result every time — so compliance can be tracked over months rather than sampled once.",
        visual: <Pipeline />,
        caption:
          "Crawl and validation path. Early stage: the skeleton and architecture exist, the crawler is in progress, and no hospitals are being monitored yet.",
        repo: "https://github.com/siddhantjena13/mrf-watch",
      },
      {
        title: "anonlint",
        meta: "Python · WebAssembly",
        body:
          "Double-blind review only works if the paper is actually anonymous. Authors strip their names from the title page and forget the rest — the /Author field the PDF exporter silently filled in, a self-citation phrased as a signature, an absolute image path baked into the LaTeX. anonlint reports every likely leak, where it is, and how to fix it. The checking core performs no file or network access of its own, so it compiles to WebAssembly and runs entirely in the browser tab: unsubmitted work is never uploaded. It reports and advises; it never edits the paper.",
        visual: <Findings />,
        caption:
          "Sample report. Findings carry a confidence score, and severity is set per venue — the same finding can be a hard error at one conference and a note at another. Pre-alpha: the checks and report format are specified, the tool is not yet usable.",
        repo: "https://github.com/siddhantjena13/anonlint",
      },
    ],
  },
];

const navLink = {
  fontFamily: SANS,
  fontSize: 12,
  fontWeight: 400,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: MUTED,
  textDecoration: "none",
};

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2rem",
        flexWrap: "wrap",
        marginBottom: "5rem",
      }}
    >
      <div>
        <a
          href="./index.html"
          style={{
            fontFamily: SANS,
            fontSize: 22,
            fontWeight: 300,
            color: INK,
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          Siddhant Jena
        </a>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 300,
            color: FAINT,
            marginTop: 4,
            letterSpacing: "0.05em",
          }}
        >
          CS · UW Allen School
        </div>
      </div>
      <nav style={{ display: "flex", gap: "1.5rem", paddingTop: 6, flexWrap: "wrap" }}>
        <a className="pj-link" style={navLink} href="./index.html">
          Home
        </a>
        <a className="pj-link" style={navLink} href={`mailto:${CONTACT.email}`}>
          Email
        </a>
        <a className="pj-link" style={navLink} href={CONTACT.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="pj-link" style={navLink} href={CONTACT.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Project({ project }) {
  return (
    <article style={{ marginBottom: "4.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: 28,
            fontWeight: 300,
            color: INK,
            letterSpacing: "0.01em",
          }}
        >
          {project.title}
        </h3>
        <span style={{ fontFamily: MONO, fontSize: 11.5, color: FAINT, letterSpacing: "0.03em" }}>
          {project.meta}
        </span>
      </div>

      <p
        style={{
          margin: "1.1rem 0 0",
          maxWidth: "62ch",
          fontFamily: SANS,
          fontSize: 15,
          fontWeight: 300,
          lineHeight: 1.65,
          color: MUTED,
        }}
      >
        {project.body}
      </p>

      <figure className="pj-figure">
        {project.visual}
        <figcaption
          style={{
            marginTop: "1.4rem",
            fontFamily: MONO,
            fontSize: 11,
            lineHeight: 1.6,
            color: FAINT,
            letterSpacing: "0.01em",
          }}
        >
          {project.caption}
        </figcaption>
      </figure>

      <a
        className="pj-repo"
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: "1.75rem",
          fontFamily: MONO,
          fontSize: 12.5,
          color: INK,
          textDecoration: "none",
          letterSpacing: "0.02em",
          borderBottom: `1px solid ${RULE}`,
          paddingBottom: 3,
        }}
      >
        View repository
        <span aria-hidden="true" style={{ color: CYAN }}>
          ↗
        </span>
      </a>
    </article>
  );
}

function Section({ section }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          paddingBottom: "0.9rem",
          borderBottom: `1px solid ${RULE}`,
          marginBottom: "2.75rem",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 500,
            color: INK,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {section.key}
        </h2>
      </div>
      {section.projects.map((p) => (
        <Project key={p.title} project={p} />
      ))}
    </section>
  );
}

export default function Projects() {
  return (
    <main
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "3.5rem 1.5rem 6rem",
      }}
    >
      <Header />
      {SECTIONS.map((s) => (
        <Section key={s.key} section={s} />
      ))}
      <footer
        style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: `1px solid ${RULE}`,
          fontFamily: MONO,
          fontSize: 11,
          color: FAINT,
          letterSpacing: "0.03em",
        }}
      >
        <a className="pj-link" href="./index.html" style={{ color: FAINT, textDecoration: "none" }}>
          ← back to home
        </a>
      </footer>
    </main>
  );
}
