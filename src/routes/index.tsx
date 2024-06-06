import { createFileRoute } from '@tanstack/react-router';
import { css, cx } from "@emotion/css";
import { Image } from "@/components/Image";
import { useTo } from "@/hooks/to";
import { Empty, Skeleton, } from "react-vant";
import { getTongueDetection } from "@/api/tongue.api";
import useSWR from "swr";
import React, { useRef } from "react";
import { iif, placeholder } from "@/utils";
import { map } from "underscore";
import { useTranslation } from "react-i18next";


export const SkeletonList = () => <Skeleton></Skeleton>;
export const NewsList = () => {
    const parent = useRef<HTMLUListElement>(null);
    const { isLoading, isValidating, data } = useSWR('/getTongueDetection', function handleGetTongueDetection() {
        return getTongueDetection();
    });

    if (isLoading) return <SkeletonList></SkeletonList>;


    //@ts-ignore
    return <ul ref={parent} flex gap-36px flex-col>

        {iif(!!data && !!data.length, map(data ?? [], (item, key) => <li key={key}
            className={"animate-slide-in-right animate-duration-100ms flex gap-36px animate-delay-[var(--i-delay)]"}
            style={{
                /*@ts-ignore*/
                "--i-delay": `${~~key * 50}ms`,
            }}
            onClick={() => window.open(item.url, "__blank")}
        >
            <div className={cx(' w-14em text-28px flex-col flex justify-between')}>
                <div className={cx('w-inherit break-after-all font-bold mb-12px')}>
                    {placeholder(item.title, "无题")}
                </div>
                <div>
                    {item.time}
                </div>
            </div>
            <div className={'w-full bg-#333333 flex flex-center w-5em'}>
                <Image src={item.jpg} className={cx("w-full h-7em")} fit={"scale-down"}></Image>
            </div>
        </li>), <Empty description={"暂无新闻"}></Empty>)}


    </ul>;
};
export const Route = createFileRoute('/')({
    component: () => {
        const to = useTo();
        const { t: $t } = useTranslation(undefined, {
            keyPrefix: 'home'
        });
        const stepper = [
            { label: $t('上传舌象'), icon: "tongue" },
            { label: $t('免费检测'), icon: "scan" },
            { label: $t('专业分析'), icon: "hos" },
        ] as const;

        return <section className={cx('flex flex-col items-center gap-12px relative w-full ')}>
            <div className={cx("bg-primary h-700px w-full flex flex-col flex-center text-white px-68px")}>
                <div className={cx('h-218px relative top-108px w-full')}>
                    <div className={'flex flex-col'}>
                        <div className={cx(" text-35px text-white flex items-center gap-12px")}>
                            <Image className={cx("w-35px")} src={"logo"}></Image>
                            <span className={cx("font-300")}>{$t("Hello")}</span>
                        </div>
                        <span
                            className={cx(" text-35px text-white text-18px font-bold")}>{$t("欢迎来到汉方舌诊")}</span>
                    </div>
                </div>
                <div className={cx('h-full flex flex-center flex-col gap-28px text-36px')}
                    onClick={() => to("/capture")}>
                    <Image src={"camera"} alt={'camera'} />
                    <span>{$t("点击上传舌象")}</span>
                </div>

            </div>
            <div className={cx("bg-white w-full py-24px box-border")}>
                <div className={cx('font-bold text-29px px-38px')}>{$t("汉方舌诊")}</div>
                <div>
                    <div
                        className={cx('w-full m-auto bg-#FFF  rounded-6px h-254px px-36px box-border flex-center ')}>
                        <div flex m-auto w-full justify-center>
                            {
                                stepper.map(({ label, icon, }, index) => {
                                    return <div key={label} flex flex-col gap-24px justify-start>
                                        <div flex items-center relative>
                                            <div
                                                className={cx('relative size-110px rounded-full bg-primary flex items-center justify-center', css`
                                                    &::after {
                                                        content: "";
                                                        position: absolute;
                                                        width: 120%;
                                                        height: 120%;
                                                        background: #ECF7F8;
                                                        border-radius: 50%;
                                                        z-index: 0;
                                                    }
                                                `)}
                                            >
                                                <Image className={"w-120px z-1"} src={icon} alt={label} />
                                            </div>
                                            {index === stepper.length - 1 ? null :
                                                <div
                                                    className={"w-100px h-86px flex items-center justify-center mx-24px"}>
                                                    <span text={"#aee4e9 48px"}>&gt;</span>
                                                    <span text={"#5EC6CF 48px"}>&gt;</span>
                                                    <span text={"#0E98A4 48px"}>&gt;</span>
                                                </div>}
                                        </div>
                                        <span className={'text-28px font-bold'}> {label}</span>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("bg-white w-full py-24px box-border px-38px")}>
                <div className={cx('font-bold text-29px mb-36px')}>{$t("每日更新")}</div>
                <NewsList />
            </div>
            {/*<Tabbar/>*/}
        </section>;
    }
});
