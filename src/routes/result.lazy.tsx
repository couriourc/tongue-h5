import {createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {cx} from "@emotion/css";
import {map} from "underscore";
import {IGoodsItem, useAtomParserResult} from "@/store";
import {Image} from "@/components/Image";
import {Swiper, SwiperSlide} from "swiper/react";
import {iif, placeholder} from "@/utils";
import {Empty, Flex,} from "react-vant";
import 'swiper/css';
import {GrAddCircle} from "react-icons/gr";
import React, {PropsWithChildren, useState} from "react";
import {WithClassName} from "@/types";
import {postMakePdf} from "@/api/tongue.api";
/*@ts-ignore*/
import Downloader from "downloadjs";
import {useTranslation} from "react-i18next";

function DrinkGoodsItem({item, itemKey, active, activeKey}: WithClassName<PropsWithChildren<{
    item: IGoodsItem,
    active: (key: number) => any;
    itemKey: any;
    activeKey: any;
}>>) {
    return <div className={cx('inline-block flex relative z-0')}>
        <div
            className={cx(
                ` rounded-20px relative mr-36px text-26px font-bold overflow-visible 
                                            text-white 
                                            bg-#9087E4 
                                            h-216px
                                            w-full
                                            py-24px  px-12px 
                                            w-12em 
                                            truncate`
            )}
        >
            <span className={cx('z-10')}>{item.name}</span>
            <div className={cx(`absolute w-full h-full z-0`)}>
                <Image src={item.pic}></Image>
            </div>
            <span className={cx("absolute right-12px top-50% -translate-y-50%")}
                  onClick={() => {
                      active(itemKey);
                  }}><GrAddCircle></GrAddCircle></span>
        </div>
    </div>;

}

function DrinkGoodsList(props: WithClassName<PropsWithChildren>) {
    const [result] = useAtomParserResult();
    const [active, setActive] = useState<number>();
    return <Swiper className={cx("h-fit w-690px  box-border overflow-x-auto whitespace-nowrap py-12px scrollbar-none")}
                   slidesPerView={'auto'}
    >
        {
            map(result.result.sups.concat(result.result.sups),
                (item, key) => <SwiperSlide
                    className={cx("w-300px! py-24px  px-12px  ")}
                    key={key}>
                    <DrinkGoodsItem item={item}
                                    key={key}
                                    itemKey={key}
                                    active={(num) => setActive(num)}
                                    activeKey={active}
                    ></DrinkGoodsItem>
                </SwiperSlide>
            )
        }

    </Swiper>;

}

export const Route = createLazyFileRoute('/result')({
    component: () => {
        const [result] = useAtomParserResult();
        const {t} = useTranslation(undefined, {keyPrefix: "result"});

        const labels = [
            {
                key: 'shese',
                label: t('舌色'),
            }, {
                key: 'dianci',
                label: t('点刺'),
            }, {
                key: 'liewen',
                label: t('裂纹'),
            }, {
                key: 'taise',
                label: t('苔色'),
            }, {
                key: 'houbotai',
                label: t('苔质'),
            }, {
                key: 'chihen',
                label: t('齿痕'),
            },
        ] as const;

        async function handlePostMakePdf() {
            return postMakePdf(result).then((res) => {
                let url = URL.createObjectURL(res);
                Downloader(url);
            });
        }

        return <section size-screen bg-white>
            <NavBar title={t("舌像综合分析")} back={"/capture"}></NavBar>
            {
                iif(result.state !== "yes", <Empty description={t("暂无数据")}></Empty>,
                    <div flex items-center flex-col gap-48px mt-12px flex-shrink-zero>
                        <Swiper
                            className={cx('w-full')}
                            slidesPerView={'auto'}
                            centeredSlides={true}
                            spaceBetween={30}
                        >
                            <SwiperSlide className={cx('w-80%! h-400px')}>
                                <div className={"inline-block relative right-2em whitespace-nowrap box-border"}>
                                    <Flex wrap="wrap"
                                          className={cx("bg-primary  rounded-18px m-auto h-400px box-border px-48px text-36px")}>
                                        {
                                            map(labels, ({label, key}, order) => <Flex.Item
                                                span={8}
                                                key={label}
                                            >
                                                <div
                                                    className={cx('flex-center text-white border-1px h-full pt-12px',
                                                        iif(order < 3, 'border-b-solid', '')
                                                    )}>
                                                    <div className={cx("flex flex-col flex-center gap-12px")}>
                                                        <span className={cx("text-28px ")}>{label}</span>
                                                        <span
                                                            className={cx("text-18px truncate ")}>
                                                {placeholder(result.she[key as keyof typeof result.she], t('无信息'))}
                                            </span>
                                                    </div>
                                                </div>
                                            </Flex.Item>)
                                        }
                                    </Flex>
                                </div>
                            </SwiperSlide>

                            {
                                map(result.result.sups, (drink, index) => <SwiperSlide
                                    className={cx("box-border w-80%! relative")}
                                    key={index}
                                >
                                    <div
                                        className={"inline-block  p-46px relative right-2em  bg-#FFCEEC w-full h-400px rounded-18px flex flex-col gap-20px"}>
                                <span className={cx('w-12em truncate text-36px ')}>
                                    {drink.name}
                                </span>
                                        <span className={cx('text-28px')}>
                                    {drink.data}
                                </span>
                                    </div>

                                    {iif(index === result.result.drinks.length - 1,
                                        <div
                                            className={cx("absolute w-10% h-full bg-primary top-0 -right-10% " +
                                                "rounded-18px write-vertical-left text-white font-bold " +
                                                "flex justify-center items-center")}>
                            <span className={'text-28px'}>
                                {t('期待更多')}
                            </span>
                                        </div>, null
                                    )}
                                </SwiperSlide>)
                            }
                        </Swiper>

                        <div flex flex-col w-full px-48px gap-20px w-690px overflow-hidden>
                            <div flex w-full justify-between items-center>
                                <span font-bold text-28px>{t('舌象释义与通常伴随的症状')}</span>
                            </div>
                            <div>
                                <div text-24px>
                                    {result.result.translate}
                                </div>
                            </div>
                        </div>
                        <div flex flex-col w-full px-48px gap-20px>
                            <div flex w-full justify-between items-center>
                                <span font-bold text-28px>{t('诊断推荐药膳')}</span>
                                <div className={cx("text-#A2A2C8 text-26px flex-center")}>
                                    <span></span>
                                </div>
                            </div>
                            <DrinkGoodsList
                                className={cx("h-fit w-690px  box-border overflow-x-auto whitespace-nowrap py-12px scrollbar-none")}></DrinkGoodsList>
                        </div>

                        <button
                            onClick={() => handlePostMakePdf()}
                            className={cx(" fixed bottom-157px bg-primary text-white text-32px px-20px py-15px outline-none border-none rounded-24px")}>点击生成完整报告
                        </button>
                    </div>
                )
            }


            {/*<Tabbar/>*/}
        </section>;
    }
});
