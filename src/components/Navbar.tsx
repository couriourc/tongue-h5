import React, {PropsWithChildren} from 'react';
import {NavBar as VantNavBar} from 'react-vant';
import {ArrowLeft} from "@react-vant/icons";
import {cx} from "@emotion/css";
import {useNavigateTo} from "@/hooks/to";
import {FileRoutesByPath} from "@tanstack/react-router";

export const NavBar = (
    {
        title = "",
        back,
    }: PropsWithChildren<{
        title?: string;
        back: keyof FileRoutesByPath;
    }>
) => {
    const to = useNavigateTo();
    return (
        <VantNavBar
            title={<div w-100vw px-24px flex>
                <div
                    className={cx("size-62px rounded-16px  flex-center bg-#F9F9FB absolute left-24px  top-50%  -translate-y-50%")}
                    onClick={() => to(back)}
                >
                    <ArrowLeft/>
                </div>
                <span className={cx("absolute top-50% left-50% -translate-50%")}>{title}</span>
            </div>}
            safeAreaInsetTop
            border={false}
            leftArrow={false}
        />
    );
};
