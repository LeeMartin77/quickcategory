/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const proxy = {
  "/api": {
    target: "http://localhost:3012",
    changeOrigin: true,
    secure: false,
    ws: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
    proxy,
  },
  plugins: [react()],
  test: {
    setupFiles: "test-setup.ts",
  },
});
