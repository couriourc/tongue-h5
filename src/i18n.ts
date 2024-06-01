import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import Backend from 'i18next-http-backend';
//import zh from './locales/zh.json?url';

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        backend: {
            loadPath: '/locales/zh.json',
            allowMultiLoading: true,
            requestOptions: { // used for fetch, can also be a function (payload) => ({ method: 'GET' })
                cache: 'default'
            }
        },
        fallbackLng: 'zh',
        preload: ['zh'],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
