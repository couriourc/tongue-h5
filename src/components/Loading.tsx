import ReactDOM, { createPortal, render } from "react-dom";
import { Overlay } from "react-vant";
import { styled } from "styled-components";
import { Loading as VantLoading } from "react-vant"
import { atom, useAtom } from "jotai";
import React, { Component, PropsWithChildren, createContext, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { createRoot } from 'react-dom/client';
import { noop } from "underscore";

const LoadingStyled = styled.div`
.minimalism-load-line {
    border: 2px solid ;
    animation: minimalism-rotate 5s linear infinite;
  
    // border-radius 可以使用 https://9elements.github.io/fancy-border-radius/ 进行调整
    &:nth-of-type(1) {
      border-radius: 38% 62% 64% 36% / 43% 35% 65% 57%;
    }
    &:nth-of-type(2) {
      animation-direction: reverse;
      border-radius: 41% 59% 40% 60% / 65% 66% 34% 35%;
    }
    &:nth-of-type(3) {
      animation-duration: 3s;
      border-radius: 73% 27% 56% 44% / 57% 74% 26% 43%;
    }
  }
  
  @keyframes minimalism-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }`;


export function Loader() {
    return createPortal(<LoadingComp />, document.body);
}
const LoadingComp = () => <Overlay >
    <div flex justify-center items-center fixed w-full h-full bg="#FFFFFFCC" z-999>
        <LoadingStyled>
            <div
                className="flex justify-center items-center min-h-screen  c-white font-size-2em minimalism-load"
            >
                <div className="relative flex justify-center items-center w-250px h-250px box-border">
                    {new Array(3).fill(1).map((_, index) => <span key={index} className="absolute top-0 left-0 w-full h-full minimalism-load-line  border-primary!"></span>)}

                    <span className="text-28px font-bold text-#333333">Loading...</span>
                </div>
            </div>
        </LoadingStyled>
    </div>
</Overlay>
const LoaderContext = createContext<{ loading: boolean, open(): void; close(): void; }>({ loading: false, open: noop, close: noop });

export function LoaderContextProvider({ children }: PropsWithChildren) {
    const [loading, set] = useState<boolean>(false);
    const open = () => set(true);
    const close = () => set(false);
    return <LoaderContext.Provider value={{ loading, open, close }}>
        {children}
        {loading ? <Loader></Loader> : null}
    </LoaderContext.Provider>
}

export const useLoaderContext = () => useContext(LoaderContext); 