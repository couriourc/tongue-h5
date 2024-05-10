import {
    defineConfig,
    presetAttributify,
    presetTagify,
    presetUno,
    transformerAttributifyJsx
} from "unocss";

export default defineConfig({
    presets: [presetUno(), presetTagify(), presetAttributify()],
    shortcuts: {
        'flex-center': "flex items-center justify-center"
    },
    theme: {
        colors: {
            'primary': "#E2AF6E"
        }
    },
    transformers: [
        transformerAttributifyJsx()
    ],
});
