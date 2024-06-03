import {createFileRoute, createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {cx} from "@emotion/css";
import {map} from "underscore";
import {IGoodsItem, INeedParserFileInfo, IParserResult, useAtomNeedToParser, useAtomParserResult} from "@/store";
import {Image} from "@/components/Image";
import {Swiper, SwiperSlide} from "swiper/react";
import {base64ToFile, iif, placeholder} from "@/utils";
import {Empty, Flex, Popover, PopoverInstance, Skeleton, Toast,} from "react-vant";
import 'swiper/css';
import {GrAddCircle} from "react-icons/gr";
import React, {PropsWithChildren, useCallback, useMemo, useRef, useState} from "react";
import {WithClassName} from "@/types";
import {postMakePdf, postTongueSuccess} from "@/api/tongue.api";
/*@ts-ignore*/
import Downloader from "downloadjs";
import {useTranslation} from "react-i18next";
import {PopoverPlacement} from "react-vant/es/popover/PropsType";
import {atom, useAtom} from "jotai";
import {useTo} from "@/hooks/to";
import useSWR from "swr";

const loadingAtom = atom<boolean>(true);

function DrinkGoodsItem({item, popoverPosition}: WithClassName<PropsWithChildren<{
    item: IGoodsItem,
    popoverPosition: PopoverPlacement,
}>>) {
    const popover = useRef<PopoverInstance>();
    const opened = useRef<boolean>(false);
    return <div className={cx('inline-block flex relative z-0 flex-shrink-zero')}
    >
        <div
            onClick={() => {
                if (opened.current)
                    popover.current?.show();
                else popover.current?.hide();
                opened.current = !opened.current;
            }}
            className={cx(
                ` rounded-20px relative mr-36px text-26px font-bold overflow-visible 
                                            text-white 
                                            bg-#9087E4 
                                            h-216px
                                            w-full w-205px
                                            py-24px  px-12px 
                                            w-12em 
                                            truncate`
            )}
        >
            <span className={cx('z-10')}>{item.name}</span>

            <div className={cx(`absolute size-full z-0 left-0`)}>
                <Image src={item.pic} fit={"fill"} className={cx("size-full")}/>
            </div>

            <div className={cx("absolute right-12px top-50% -translate-y-50% flex-center")}
            >
                <Popover
                    ref={(ref) => popover.current = ref!}
                    reference={
                        <GrAddCircle/>
                    }
                    placement={popoverPosition}
                    teleport={document.body}
                    offset={[0, 12]}
                    trigger={"manual"}
                >
                    <div
                        className={cx("w-368px flex relative flex-col gap-20px text-white  bg-amber box-border p-12px")}>
                        <div className={cx('w-full h-full ')}>
                            <div text-28px font-bold className={cx('break-all z-10')}>{item.name}</div>
                            <div
                                className={cx("min-h-200px text-18px overflow-y-auto max-h-250px z-10")}>
                                {item.data}
                            </div>
                        </div>

                        <div className={cx(`absolute w-full h-full z-0 top-0 left-0`)}>
                            <Image src={item.pic}
                                   className={cx("size-full ")}
                                   fit={"fill"}/>
                        </div>

                    </div>
                </Popover>
            </div>

        </div>

    </div>;

}

function DrinkGoodsList(props: WithClassName<PropsWithChildren>) {
    const [result] = useAtomParserResult();
    return <Swiper className={cx("h-fit w-690px  box-border overflow-x-auto whitespace-nowrap py-12px scrollbar-none")}
                   slidesPerView={'auto'}
    >
        {
            map(result?.result?.sups ?? [],
                (item, key) => <SwiperSlide
                    className={cx("w-300px! py-24px  px-12px  ")}
                    key={key}>
                    <DrinkGoodsItem item={item}
                                    key={key}
                                    popoverPosition={iif(key !== (result.result.sups.length - 1), "right", "left")!}
                    />
                </SwiperSlide>
            )
        }

    </Swiper>;

}

export const Route = createLazyFileRoute('/result')({
    component: () => {
        const [{base64}] = useAtomNeedToParser();
        const [result, setResult] = useAtomParserResult();
        const {t} = useTranslation(undefined, {keyPrefix: "result"});

        const {isLoading} = useSWR(() => base64, async (base64: string) => {
            const file = base64ToFile(base64,);
            return postTongueSuccess({
                file: file
            }).then((result: IParserResult) => {
                if (result.state !== "yes") {
                    Toast.fail(t("解析出错！"));
                    return Promise.reject("");
                }
                setResult(result);
                return Promise.resolve(result);
            }).catch(() => {
                Toast.fail(t("解析出错！"));
            }).finally(() => {
            });
        });

        const Preview = iif((result.state !== "yes"), () => <Empty
                description={t("解析失败")}></Empty>,
            () => <ParserResult isLoading={false}></ParserResult>)!;
        console.log(isLoading);
        return <section size-screen bg-white>
            <NavBar title={t("舌像综合分析")} back={"/capture"}></NavBar>
            {
                isLoading ?
                    <ParserResult isLoading={true}></ParserResult> :
                    <Preview></Preview>
            }
        </section>;
    }
});


function ParserResult({isLoading}: { isLoading: boolean }) {
    const [result, setResult] = useAtomParserResult();

    const {t} = useTranslation(undefined, {keyPrefix: "result"});

    async function handlePostMakePdf() {
        return postMakePdf(result).then((res) => {
            let url = URL.createObjectURL(res);
            Downloader(url);
        });
    }

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

    return <div flex items-center flex-col gap-48px mt-12px flex-shrink-zero>
        <Swiper
            className={cx('w-full')}
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            autoHeight={true}
            onNavigationNext={(event) => {
                console.log(event);
            }}
        >
            <SwiperSlide className={cx('w-80%! relative right-2em')}>
                <div className={cx("flex flex-col gap-24px")}>
                    <div className={"inline-block  whitespace-nowrap box-border"}>
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
                                               {
                                                   placeholder(result?.she?.[key as keyof typeof result.she], t('无信息'))
                                               }
                                            </span>
                                        </div>
                                    </div>
                                </Flex.Item>)
                            }
                        </Flex>
                    </div>

                    <div flex flex-col w-full gap-20px overflow-hidden>
                        <div flex w-full justify-between items-center>
                            <span font-bold text-28px>{t('舌象释义与通常伴随的症状')}</span>
                        </div>
                        {
                            (() => {
                                if (isLoading) return <div>{t("加载中")}</div>;
                                return <div text-24px text-justify>
                                    {result?.result?.translate}
                                </div>;
                            })()
                        }
                    </div>
                </div>
            </SwiperSlide>

            {
                map(result?.result?.sups ?? [], (drink, index) => <SwiperSlide
                    className={cx("box-border w-80%! relative right-2em")}
                    key={index}
                >
                    <div className={cx("flex flex-col gap-24px")}>
                        <div
                            className={cx(" bg-#FFCEEC overflow-hidden  h-400px rounded-18px box-border")}>


                            <div
                                className={`inline-block  h-400px 
                                               w-full text-white
                                                gap-20px relative`
                                }>
                                <div className={cx(" flex flex-col z-10 absolute p-36px")}>
                                                                   <span
                                                                       className={cx('w-12em truncate text-36px mt-12px')}> {drink.name}  </span>
                                    <span
                                        className={cx('text-28px')}> {drink.data} </span>

                                </div>
                                <Image className={cx("size-full absolute top-0 left-0 z-0")}
                                       fit={'fill'}
                                       src={drink.pic}></Image>
                            </div>

                            {iif(index === result.result.drinks.length - 1,
                                <div
                                    className={cx(`
                                                    absolute w-10% h-full bg-primary top-0 -right-15%
                                                    rounded-18px write-vertical-left
                                                     text-white font-bold 
                                                     flex-center h-400px!
                                                    `)}><span className={'text-28px'}>{t('期待更多')}</span>
                                </div>, null
                            )}

                        </div>
                        <div flex flex-col w-full gap-20px overflow-hidden h-full>
                            <div flex w-full justify-between items-center>
                                <span font-bold text-28px>{drink.name}</span>
                            </div>
                            <div text-24px text-justify>
                                {drink.data}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>

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

        {
            !isLoading ?
                <button
                    onClick={() => handlePostMakePdf()}
                    className={cx("  bottom-157px bg-primary text-white text-32px px-20px mt-12px py-15px outline-none border-none rounded-24px")}>
                    {t("点击生成完整报告")}
                </button>
                : null
        }
    </div>;
}
