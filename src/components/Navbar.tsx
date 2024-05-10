import React, {PropsWithChildren} from 'react';
import {NavBar as VantNavBar} from 'react-vant';
import {useNavigate} from "react-router";

export const NavBar = (
    {
        title
    }: PropsWithChildren<{
        title: string;
    }>
) => {
    const to = useNavigate();
    return (
        <VantNavBar
            onClickLeft={()=>to(-1)}
            leftText={title}
            safeAreaInsetTop
            border={false}
        />
    );
};
