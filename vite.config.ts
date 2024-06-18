import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';
import svgr from 'vite-plugin-svgr';
// @ts-ignore
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            include: '**/*.svg',
        }),
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            // @ts-ignore
            '*': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
});
