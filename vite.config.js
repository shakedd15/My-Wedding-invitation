import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base '/' is correct when a custom domain is configured on GitHub Pages.
  // If you ever need the github.io subpath URL instead, change this to
  // '/My-Wedding-invitation/'.
  base: "/",
  plugins: [react(), tailwindcss()],
});
