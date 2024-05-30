import {defineConfig, presetAttributify, presetTagify, presetUno, transformerAttributifyJsx} from "unocss";

import {presetScrollbar} from 'unocss-preset-scrollbar';

export default defineConfig({
    presets: [presetUno(), presetTagify(), presetAttributify(), presetScrollbar()],
    shortcuts: {
        'flex-center': "flex items-center justify-center",
        'card-base': "bg-#FFFFFFCC card-shadow rounded-16px p-32px ",
    },
    rules: [
        [
            'card-shadow',
            {
                'box-shadow': '0px 4px 4px 0px #E2AF6E4D'
            }
        ],
    ],
    theme: {
        colors: {
            'primary': "#0E98A4",
            "danger": "#e62939"
        }
    },
    transformers: [
        transformerAttributifyJsx()
    ],
});
