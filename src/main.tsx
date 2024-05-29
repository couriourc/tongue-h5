import React from 'react';
import ReactDOM from 'react-dom/client';
import 'uno.css';

import "@/styles/variables.less";
import '@/styles/index.less';
import '@/styles/reset.less';
import {App} from "@/App";


// Render the app
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>,
);
