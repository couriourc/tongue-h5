import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'uno.css';
import "@/styles/variables.less";
import '@/styles/index.less';
import {ConfigProvider} from 'react-vant';
import {themeVars} from "@/theme";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider themeVars={themeVars}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
);
