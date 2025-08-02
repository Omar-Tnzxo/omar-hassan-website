import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // تحسين حجم الملفات
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          utils: ['clsx', 'tailwind-merge', 'maath']
        }
      }
    },
    // تحسين الأداء
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    // إضافة إعدادات إضافية لحل مشكلة المسارات
    commonjsOptions: {
      include: [/node_modules/],
    }
  },
  // تحسين التطوير
  server: {
    hmr: {
      overlay: false
    }
  },
  // تحسين التحميل
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
});
