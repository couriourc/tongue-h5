import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Capture from "./views/capture/Capture";
import Result from "@/views/result/Result";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

NProgress.configure({

})

const WithNprogress = ({ children }: PropsWithChildren) => {
    useState(NProgress.start());
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        }
    });
    return children;
}

function App() {
    const routes = [
        { path: "/", Element: Home }, /* 👈 Renders at /result */
        { path: "/capture", Element: Capture },
        { path: "/result", Element: Result },
    ] as const;
    return <>
        <BrowserRouter basename={"/"}>
            <Routes>
                {
                    routes.map(({ Element, path }) => {
                        return <Route path={path} key={path} element={
                            <WithNprogress>
                                <Element></Element>
                            </WithNprogress>
                        }>
                        </Route>
                    })
                }
            </Routes>
        </BrowserRouter >
    </>;
}

export default App;
