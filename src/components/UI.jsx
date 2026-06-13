import { useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Resume content — real copy, dense                                  */
/* ------------------------------------------------------------------ */
const SECTIONS = [
  {
    key: "ABOUT",
    items: [
      {
        head: "Siddhant Jena",
        meta: "UW CS '27",
        body: "Hi! I'm a Computer Science undergraduate at the University of Washington (Class of '27). I currently have a research focus on reinforcement learning, but have also done work in computational biology/neuroscience. Outside of school I train in Muay Thai / MMA, love watching movies, and enjoy the outdoors.",
      },
    ],
  },
  {
    key: "ENGINEERING",
    items: [
      {
        head: "Remitly — Incoming SWE Intern",
        meta: "Summer 2026",
        body: "Joining Remitly's cross-border money-movement platform on the agentic ai team build and ship production backend services that move funds for immigrants and their families at scale.",
      },
      {
        head: "CureBay — SWE Intern",
        meta: "Prior",
        body: "Built full-stack features for a rural digital-healthcare platform — APIs and interfaces connecting patients in underserved areas to remote clinicians and e-clinics.",
      },
    ],
  },
  {
    key: "RESEARCH",
    items: [
      {
        head: "Social RL Lab · UW",
        meta: "Advisor: Natasha Jaques",
        body: "Developing a standalone probabilistic-programming pipeline for theory-of-mind inference in multi-agent settings, using the memo framework with LLM-generated candidate programs.",
      },
      {
        head: "Srivatsan Lab · Fred Hutch",
        meta: "CoDEM",
        body: "Building CoDEM, a multimodal embedding model that co-embeds DNA, RNA, and protein sequences into a single shared latent space to enable cross-modal biological inference.",
      },
    ],
  },
  {
    key: "PROJECTS",
    items: [
      {
        head: "ToM Inference Pipeline",
        meta: "memo + LLMs",
        body: "Bayesian models of other agents written in memo; LLMs draft candidate programs and inference recovers latent goals and beliefs from behavior.",
      },
      {
        head: "CoDEM",
        meta: "Multimodal bio embeddings",
        body: "Contrastive co-embedding of biological sequences across modalities, producing a shared representation space for DNA, RNA, and protein.",
      },
      {
        head: "Vision Illusions",
        meta: "CNNs vs ViTs",
        body: "Trained ResNet-18 and ViT-tiny on geometric regression to probe optical-illusion susceptibility. ResNet-18 was broadly fooled; ViT-tiny showed partial immunity, most clearly on Ponzo.",
      },
      {
        head: "TAG!",
        meta: "Full Stack Mobile App",
        body: "Created a full-stack web app to facilitate gamified learning. Users can create/join rooms, answer questions to earn points, and compete on a leaderboard. Built with React, Node.js, and Socket.IO for real-time interactivity.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Theme                                                              */
/* ------------------------------------------------------------------ */
const CYAN = "#58d5f2";
const DIM = "#3a8aa0";
const BODY = "#86c0d1"; 
const INK = "#e8fbff";
const PIXEL = '"VT323", monospace';
const MONO = '"Share Tech Mono", monospace';

const SCREEN_W = 300;
const SCREEN_H = 212;

const css = `
@keyframes rt-blink { 0%,92%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.08)} }
@keyframes rt-caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }
.rt-eye { animation: rt-blink 4.2s infinite ease-in-out; transform-origin: center; }
.rt-caret { animation: rt-caret 1s steps(1) infinite; }
.rt-scroll::-webkit-scrollbar { width:4px; }
.rt-scroll::-webkit-scrollbar-thumb { background:#1d4350; border-radius:2px; }
.rt-scroll::-webkit-scrollbar-track { background:transparent; }
.rt-sec:hover .rt-secname { color:${CYAN}; }
`;

function Scanlines() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: 8,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0 1px, transparent 1px 3px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

function PixelFace() {
  const eye = { width: 34, height: 44, background: CYAN, borderRadius: 4, boxShadow: `0 0 14px ${CYAN}` };
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <div style={{ display: "flex", gap: 44 }}>
        <div className="rt-eye" style={eye} />
        <div className="rt-eye" style={{ ...eye, animationDelay: "0.12s" }} />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[10, 10, 10, 10].map((w, i) => (
          <div key={i} style={{ width: w, height: 8, background: DIM, borderRadius: 2, boxShadow: `0 0 8px ${DIM}` }} />
        ))}
      </div>
      <div style={{ fontFamily: PIXEL, fontSize: 15, color: DIM, letterSpacing: 3, marginTop: 6 }}>
        SIDDHANT_OS // IDLE<span className="rt-caret">_</span>
      </div>
    </div>
  );
}

function Terminal() {
  // Start with ABOUT expanded
  const [open, setOpen] = useState("ABOUT");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        color: CYAN,
      }}
    >
      {/* header */}
      <div style={{ flex: "0 0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: 0.5 }}>
          siddhant:~$ portfolio.exe
        </div>
        <div style={{ borderBottom: "1px solid #15323c", marginTop: 4 }} />
      </div>

      {/* scroll region - sizes scaled down */}
      <div
        className="rt-scroll"
        onWheel={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          pointerEvents: "auto",
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
          marginTop: 4,
          paddingRight: 4,
        }}
      >
        {SECTIONS.map((sec) => {
          const isOpen = open === sec.key;
          return (
            <div key={sec.key} className="rt-sec" style={{ marginBottom: 2 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(isOpen ? null : sec.key);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 0",
                  display: "flex",
                  gap: 6,
                  alignItems: "baseline",
                }}
              >
                <span style={{ color: DIM, fontFamily: MONO, fontSize: 8 }}>
                  {isOpen ? "[-]" : "[+]"}
                </span>
                <span
                  className="rt-secname"
                  style={{
                    fontFamily: PIXEL,
                    fontSize: 8,
                    lineHeight: 1,
                    letterSpacing: 1,
                    color: isOpen ? CYAN : "#bfe7f3",
                    textShadow: isOpen ? `0 0 5px ${CYAN}` : "none",
                  }}
                >
                  {sec.key}
                </span>
              </button>

              {isOpen && (
                <div style={{ paddingLeft: 18, paddingTop: 1, paddingBottom: 4 }}>
                  {sec.items.map((it) => (
                    <div key={it.head} style={{ marginBottom: 6 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 6,
                        }}
                      >
                        <span style={{ fontFamily: MONO, fontSize: 8, color: INK, lineHeight: 1.2 }}>
                          {it.head}
                        </span>
                        <span style={{ fontFamily: MONO, fontSize: 7.5, color: DIM, whiteSpace: "nowrap" }}>
                          {it.meta}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontFamily: MONO,
                          fontSize: 7.5,
                          lineHeight: 1.3,
                          color: BODY,
                        }}
                      >
                        {it.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div
        style={{
          flex: "0 0 auto",
          fontFamily: MONO,
          fontSize: 8,
          color: DIM,
          letterSpacing: 0.5,
          paddingTop: 4,
          borderTop: "1px solid #15323c",
        }}
      >
        &gt; tap outside to exit<span className="rt-caret">_</span>
      </div>
    </div>
  );
}

/* Screen shell — cross-fades face <-> terminal on `active` */
export default function UI({ active, onEnter }) {
  return (
    <div
      onClick={(e) => {
        // If the screen is idle, clicking it triggers the zoom
        if (!active && onEnter) {
          e.stopPropagation();
          onEnter();
        }
      }}
      style={{
        position: "relative",
        width: SCREEN_W,
        height: SCREEN_H,
        background: "#05070a",
        border: "2px solid #11252c",
        borderRadius: 8,
        boxShadow: "inset 0 0 24px rgba(0,0,0,0.9)",
        overflow: "hidden",
        userSelect: "none",
        cursor: active ? "default" : "pointer" // Shows a pointer finger when idle
      }}
    >
      <style>{css}</style>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: active ? "none" : "auto" }}
      >
        <PixelFace />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut", delay: active ? 0.15 : 0 }}
        style={{ position: "absolute", inset: 0, pointerEvents: active ? "auto" : "none" }}
      >
        <Terminal />
      </motion.div>

      
    </div>
  );
}