import React, { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home/Home";
import { Capture } from "./views/capture/Capture";
import { Result } from "@/views/result/Result";
import { LoaderContextProvider } from "./components/Loading";

function App() {
    useEffect(() => {
    }, [])
    return <>
        <BrowserRouter basename={"/"}>
            <Routes>
                <Route path="/" element={
                    <Home />
                } /> {/* 👈 Renders at / */}
                <Route path="/capture" element={<Capture />} /> {/* 👈 Renders at /capture */}
                <Route path="/result" element={<Result />} /> {/* 👈 Renders at /capture */}
            </Routes>
        </BrowserRouter >
    </>;
}

export default App;
