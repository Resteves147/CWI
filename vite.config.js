import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = process.env.PORT || 5000;

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/soil': {
        target: `http://localhost:${port}`,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log("[proxy] ->", req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log("[proxy] <-", req.method, req.url, proxyRes.statusCode);
          });
          proxy.on('error', (err, req, res) => {
            console.error("[proxy] error",req.method, req.url, err.message);
          });
        },
      },
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
