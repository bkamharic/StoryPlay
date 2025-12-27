import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures relative paths for WordPress/Subfolder deployment
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const mid = id.toLowerCase();
            if (mid.includes('recharts') || mid.includes('d3')) {
              return 'vendor-charts';
            }
            if (mid.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (mid.includes('react') || mid.includes('scheduler')) {
              return 'vendor-core';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
})