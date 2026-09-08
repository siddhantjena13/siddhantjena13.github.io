import CartPole from "../components/CartPole";
import Findings from "../components/Findings";
import Pipeline from "../components/Pipeline";
import PunchCrop from "../components/PunchCrop";
import { CONTACT, CYAN, FAINT, INK, MONO, MUTED, RULE, SANS } from "../contact";

const SECTIONS = [
  {
    key: "Reinforcement Learning",
    projects: [
      {
        title: "rl-from-scratch",
        meta: "Python · NumPy",
        body:
          "Four reinforcement learning algorithms — REINFORCE, a learned baseline, A2C, and PPO — built from scratch in NumPy, with no autograd and no RL library. Every gradient is derived by hand, and each algorithm is a single file, so the difference between two files is the algorithm and nothing else. Benchmarked on CartPole: PPO solved it in all three runs.",
        visual: <CartPole />,
        caption:
          "CartPole-v1, the balance task all four algorithms are benchmarked on. Across 3 seeds, PPO solved 3/3 — the same code with a weaker advantage estimate solved 0/3.",
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
          "US hospitals are required by law to publish their prices, but nobody checks continuously — enforcement only happens when someone complains. mrf-watch fetches each hospital's price file, validates it against the federal format, and logs the result every time, turning a one-off audit into an ongoing public record. Early stage: the architecture is in place and the crawler is in progress.",
        visual: <Pipeline />,
        caption:
          "The path a hospital's file takes through the system. No hospitals are being monitored yet.",
        repo: "https://github.com/siddhantjena13/mrf-watch",
      },
      {
        title: "anonlint",
        meta: "Python · WebAssembly",
        body:
          "Double-blind review breaks when authors leave their identity in the file — hidden PDF metadata, a self-citation, an image path with their name in it. anonlint scans a paper and reports every likely leak, where it is, and how to fix it. It compiles to WebAssembly and runs entirely in the browser, so unsubmitted work is never uploaded. Pre-alpha: the checks are specified, the tool is not yet usable.",
        visual: <Findings />,
        caption:
          "Sample report. Each finding carries a confidence score, and severity is set per venue — the same leak can be a hard error at one conference and a note at another.",
        repo: "https://github.com/siddhantjena13/anonlint",
      },
    ],
  },
  {
    key: "Machine Learning",
    projects: [
      {
        title: "cross-domain-boxing-recognition",
        meta: "Python · VideoMAE",
        body:
          "A video model that watches a clip of Olympic boxing and calls the punch: head shot, body shot, miss, or blocked. Built by fine-tuning VideoMAE on 4,609 punches labelled by licensed referees. Every bout is filmed by two cameras at once, so the data is split by camera angle — otherwise the same punch lands in both training and testing and the score means nothing. Correct on 71% of unseen clips, against 53% for always guessing the most common answer.",
        visual: <PunchCrop />,
        caption:
          "Each punch becomes a 16-frame clip cropped to the attacker. That crop is also the blind spot: blocks are the hardest class to call, because the throw looks the same either way — what makes it a block is the defender's hands, just outside the box.",
        repo: "https://github.com/siddhantjena13/cross-domain-boxing-recognition",
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
