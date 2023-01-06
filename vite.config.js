import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, "src"),
  plugins: [
    basicSsl(),
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "safari-pinned-tab.svg",
      ],
      manifest: {
        name: "Hexxagon",
        short_name: "Hex",
        start_url: "index.html",
        id: "hexxagon",
        icons: [
          {
            src: "/Hexxagon_UI/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Hexxagon_UI/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/Hexxagon_UI/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/Hexxagon_UI/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 8080,
    https: true,
  },
  base: "/Hexxagon_UI/",
});
