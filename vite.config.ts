import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use './src/styles/common/variables.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
});
