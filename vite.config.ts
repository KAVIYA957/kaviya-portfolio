import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/kaviya-portfolio/",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      }
    ]
  },
  build: {
    rollupOptions: {
      external: [
        /^@\/components\/ui\/toaster/,
        /^@\/components\/ui\/sonner/,
        /^@\/components\/ui\/tooltip/
      ]
    }
  }
});
