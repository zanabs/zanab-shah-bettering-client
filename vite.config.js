import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  // optimizeDeps:{
  //   include: ['axios']
  // },
  // build: {
  //   commonjsOptions: {
  //     include: ['/node_modules/axios']
  //   }
  // }
})
