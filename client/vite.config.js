import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { nxDotEnvSupport } from "vite-plugin-nx-dotenv";
//vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
});

// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), "");
//   return {
//     plugins: [react(), svgrPlugin()],
//     define: {
//       __APP_ENV__: env,
//     },
//   };
// });
