import {
    defineConfig,
    presetAttributify,
    presetTagify,
    presetUno,
} from "unocss";
export default defineConfig({
    presets: [presetUno(), presetTagify(), presetAttributify()],
});