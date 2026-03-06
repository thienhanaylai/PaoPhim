import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "axios"],
          "chart-vendor": ["chart.js", "d3"],
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
