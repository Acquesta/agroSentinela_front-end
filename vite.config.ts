import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"; // <--- 1. Importe o plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      // <--- 2. Adicione a configuração
      registerType: "autoUpdate", // Atualiza o app automaticamente quando houver nova versão
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"], // Arquivos estáticos extras

      // CONFIGURAÇÃO DA IDENTIDADE (MANIFEST)
      manifest: {
        name: "AgroSentinela",
        short_name: "AgroSentinela",
        description: "Monitoramento de campo Offline-First",
        theme_color: "#10b981", // Verde esmeralda (estilo Agro)
        background_color: "#ffffff",
        display: "standalone", // Faz parecer app nativo (sem barra do navegador)
        orientation: "portrait", // Bloqueia rotação (opcional, bom para uso em campo com uma mão)
        icons: [
          {
            src: "pwa-192x192.png", // Você precisa criar esses arquivos na pasta public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Importante para ícones redondos no Android
          },
        ],
      },

      // CONFIGURAÇÃO DE CACHE (OFFLINE)
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Cacheia todo o build
        runtimeCaching: [
          {
            // Exemplo: Cachear fontes do Google para não quebrar offline
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <--- 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      // Habilita PWA no modo de desenvolvimento (para testar fácil)
      devOptions: {
        enabled: true,
        /* A linha abaixo é ESSENCIAL para evitar a tela branca no dev */
        type: "module",
        /* Força o navegador a recarregar se o SW mudar */
        navigateFallback: "index.html",
      },
    }),
  ],
});
