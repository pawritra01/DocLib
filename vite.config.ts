import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [preact()],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
}));
