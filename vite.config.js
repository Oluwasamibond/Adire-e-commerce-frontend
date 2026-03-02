import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allow network connections
    port: 5173,
    allowedHosts: [
      "localhost",
      "unmannish-suffusedly-charolette.ngrok-free.dev" // your ngrok frontend URL
    ],
    proxy: {
      "/api": {
        target: "http://localhost:8000", // backend is now port 8000
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
