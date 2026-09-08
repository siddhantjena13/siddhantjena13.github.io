import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const page = (file) => fileURLToPath(new URL(file, import.meta.url));

// base "./" makes the build path-relative, so it works at
// siddhantjena13.github.io (root) AND at /repo-name/ project pages.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      // Two HTML entries -> dist/index.html and dist/projects.html, each with
      // its own bundle. The projects page never pulls in three.js.
      input: {
        main: page("index.html"),
        projects: page("projects.html"),
      },
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
