import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'uno.css';
import { ConfigProvider } from 'react-vant';
import { themeVars } from "@/theme";


import "@/styles/variables.less";
import '@/styles/index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider themeVars={themeVars}>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
);
