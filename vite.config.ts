import {ConfigEnv, defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import Unocss from "unocss/vite";

import {viteVConsole} from 'vite-plugin-vconsole';
import * as path from 'path';
import {VitePWA} from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig(({command, mode}: ConfigEnv) => ({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    plugins: [
        react(),
        Unocss({}),
        viteVConsole({
            entry: path.resolve('src/main.tsx'), // or you can use entry: [path.resolve('src/main.ts')]
            enabled: command !== 'serve' || mode === 'test',
            config: {
                maxLogNumber: 1000,
                theme: 'dark'
            }
        }),
        VitePWA({
            // 插件配置项
            manifest: {
                "name": 'PWA Demo',
                "description": "A PWA demo built with Vite and vite pwa",
                "theme_color": "#242424",
                // 为了方便，使用svg图标
                icons: [
                    {
                        "src": "/vite.svg",
                        "sizes": "192x192",
                        "type": "image/svg+xml"
                    },
                    {
                        "src": "/vite.svg",
                        "sizes": "512x512",
                        "type": "image/svg+xml"
                    }
                ]
            },
        }),
    ],
}));
