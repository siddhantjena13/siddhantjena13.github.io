import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the build path-relative, so it works at
// siddhantjena13.github.io (root) AND at /repo-name/ project pages.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
