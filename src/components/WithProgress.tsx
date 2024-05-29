import {PropsWithChildren, useEffect, useState} from "react";
import NProgress from "nprogress";

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
