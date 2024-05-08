import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Capture} from "./views/capture/Capture";

function App() {
    return <>
        <BrowserRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<Capture/>}/> {/* 👈 Renders at /app/ */}
            </Routes>
        </BrowserRouter>
    </>;
}

export default App;
