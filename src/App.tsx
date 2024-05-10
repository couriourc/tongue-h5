import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./views/home/Home";
import {Capture} from "./views/capture/Capture";

function App() {
    return <>
        <BrowserRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<Home/>}/> {/* 👈 Renders at / */}
                <Route path="/capture" element={<Capture/>}/> {/* 👈 Renders at /capture */}
                <Route path="/result" element={<Capture/>}/> {/* 👈 Renders at /capture */}
            </Routes>
        </BrowserRouter>
    </>;
}

export default App;
