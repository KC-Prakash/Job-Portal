import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@utils": "/src/utils",
      "@api": "/src/api",   
    },
  },
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["axios"], 
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
