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
      // Two HTML entries -> dist/index.html and dist/projects.html.
      input: {
        main: page("index.html"),
        projects: page("projects.html"),
      },
      output: {
        // Only React is chunked by hand, because it is the one dependency both
        // entries genuinely share. Everything else is left to Rollup, which
        // places it with the entry that uses it.
        //
        // Grouping three/drei by hand instead created a cycle: drei's helper
        // packages (three-stdlib, maath) landed outside the "three" chunk but
        // import three, while three's packages import them back. The two chunks
        // then imported each other, so the projects page pulled in all of
        // three.js just by importing React.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          return;
        },
      },
    },
  },
});
