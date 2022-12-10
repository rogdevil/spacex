import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  "strictNullChecks": false,
})