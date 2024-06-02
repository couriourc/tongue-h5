import {PropsWithChildren, useEffect, useState} from "react";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

export const WithNprogress = ({children}: PropsWithChildren) => {
    useState(NProgress.start());
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    });
    return children;
};
