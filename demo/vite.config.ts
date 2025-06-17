import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    fs: {
      strict: false,
      // allow: ["wasm-pkg", "*"],
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ["haddock-restraints-wasm"],
  },
});
