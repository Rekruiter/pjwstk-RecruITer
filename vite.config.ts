import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'eslint',
    },
  ],
  assetsInclude: /\.(png|jpe?g|gif|svg)$/i,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
