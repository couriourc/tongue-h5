import {useLocation} from "@tanstack/react-router";
import {cx} from "@emotion/css";
import {useTo} from "@/hooks/to";
import {Tabbar as VantTabbar} from "react-vant";
import {map} from "underscore";
import {Image} from "@/components/Image";
import {iif} from "@/utils";

export const Tabbar = () => {
    const location = useLocation();
    console.log(location.pathname);
    const tabs = [
        {
            cls: cx('w-48px'),
            src: "home",
            activeSrc: "home-active",
            label: '主页',
            pathname: "/"
        },
        {
            cls: cx('h-48px'),
            src: "maintain",
            activeSrc: "maintain-active",
            label: '未知',
            pathname: null
        },
        {
            cls: cx('h-48px'),
            src: "detail",
            activeSrc: "detail-active",
            label: '结果',
            pathname: "/result"
        },
    ];
    const to = useTo();
    return <VantTabbar border={true} fixed={true}>
        {
            map(tabs, (item) => {
                return <VantTabbar.Item key={item.label} onClick={() => {
                    if (!item.pathname) return;
                    /*@ts-ignore*/
                    to(item.pathname);
                }}>
                    {iif(location.pathname !== item.pathname,
                        <Image
                            className={cx(item.cls, 'filter-grayscale-100')}
                            src={item.src}></Image>
                        ,
                        <Image className={cx(item.cls)}
                               src={item.activeSrc}></Image>
                    )}
                </VantTabbar.Item>;
            })
        }
    </VantTabbar>;
};
