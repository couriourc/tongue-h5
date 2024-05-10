import React from 'react';
import {Toast, NavBar as VantNavBar} from 'react-vant';

export const NavBar = () => {
    return (
        <VantNavBar
            title="标题"
            onClickLeft={() => Toast('返回')}
            onClickRight={() => Toast('按钮')}
            safeAreaInsetTop
        />
    );
};
