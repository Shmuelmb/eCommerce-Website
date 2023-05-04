import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

//vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
});
