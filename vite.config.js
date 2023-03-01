import { resolve, join } from "path";
import { defineConfig } from "vite";
import glob from "glob";

export default defineConfig({
  base: "./",
  root: join(__dirname, "src"),
  server: {
    port: 3000,
  },
  build: {
    outDir: join(__dirname, "dist"),
    rollupOptions: {
      input: glob.sync(resolve(__dirname, "src", "**/*.html")),
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
