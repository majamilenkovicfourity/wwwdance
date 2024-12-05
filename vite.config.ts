import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/wwwdance",
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use './src/styles/common/variables.scss' as *;`,
      },
    },
  },
});
