import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    outDir: "dist",
    external: ["vite", "express", "path", "dotenv"],
    dts: {
      resolve: true,
    },
    clean: true,
    sourcemap: false,
    minify: false,
  },
]);
