import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Config de Vite + plugin PWA: esto es lo que te permite que la gente
// "instale" la app desde el navegador del celular sin pasar por App Store / Play Store.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Éxito Real — Diario",
        short_name: "Éxito Real",
        description: "Tu práctica diaria de reflexión",
        theme_color: "#0B0B0D",
        background_color: "#0B0B0D",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
