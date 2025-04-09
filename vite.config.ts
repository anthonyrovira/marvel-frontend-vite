import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api-reacteur": {
          target: env.VITE_REACTEUR_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-reacteur/, ""),
        },
      },
    },
  };
});
