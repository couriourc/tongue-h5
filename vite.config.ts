import {ConfigEnv, defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import Unocss from "unocss/vite";

import {viteVConsole} from 'vite-plugin-vconsole';
import * as path from 'path';
import {VitePWA} from 'vite-plugin-pwa';
import pkg from "./package.json";
// vite.config.ts
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';


function publicAssets(path: string) {
    return new URL(path, import.meta.url).href;
}


// https://vitejs.dev/config/
export default defineConfig(({command, mode}: ConfigEnv) => {
    const need_debug = false;
    return ({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            }
        },
        plugins: [
            react(),

            TanStackRouterVite(),
            Unocss({}),
            viteVConsole({
                entry: path.resolve('src/main.tsx'), // or you can use entry: [path.resolve('src/main.ts')]
                enabled: need_debug,
                config: {
                    maxLogNumber: 1000,
                    theme: 'dark'
                }
            }),
            VitePWA({
                // 插件配置项
                manifest: {
                    "name": pkg.app.name,
                    "description": pkg.app.description,
                    "theme_color": pkg.app.theme_color,
                    // 为了方便，使用svg图标
                    icons: [
                        {
                            "src": publicAssets("/img/logo.png"),
                            "sizes": "192x192",
                            "type": "image/png"
                        },
                        {
                            "src": publicAssets("/img/logo.png"),
                            "sizes": "512x512",
                            "type": "image/png"
                        }
                    ]
                },
            }),
        ],
        esbuild: {
            drop: need_debug ? [] : ['console', 'debugger'] as any,

        },
    });
});
