import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        // VitePWA({...}) - Temporarily disabled for Vercel debugging
    ],
    publicDir: 'public',
    server: {
        port: 5000
    }
});
