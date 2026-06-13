# Siddhant Jena — 3D Portfolio

Interactive 3D portfolio: a floating robot built from React Three Fiber primitives.
Click it and the camera dives into its visor, where the UI lives.

## Stack
React 18 · Vite 5 · Tailwind CSS 3 · @react-three/fiber · @react-three/drei · Framer Motion

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
For the user root site (siddhantjena13.github.io): build and push `dist/` contents
to the repo (or set up a GitHub Action that runs `npm run build` and publishes `dist`).

For a project repo, the included script works out of the box:
```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```
`base: "./"` in vite.config.js keeps asset paths relative, so both setups work.

## Where things live
- `src/App.jsx` — phase state machine (idle → zoom → ui), Canvas, lighting, DOM chrome
- `src/components/Robot.jsx` — the robot (primitives only), blink, cursor-tracking, hover
- `src/components/CameraRig.jsx` — damped camera fly-in + arrival handoff
- `src/components/UI.jsx` — the inside-the-visor overlay and accordion nav
