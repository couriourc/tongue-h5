import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'uno.css';
import {ConfigProvider} from 'react-vant';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
);
