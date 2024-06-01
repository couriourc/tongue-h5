import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import zh from './locales/zh.json';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            zh: {translation: zh},
        },
        fallbackLng: 'zh',
        preload: ['zh'],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
