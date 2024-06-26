import {createFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {css, cx} from "@emotion/css";
import {map} from "underscore";
import {IGoodsItem, IParserResult, useAtomNeedToParser} from "@/store";
import {Image} from "@/components/Image";
import {Swiper, SwiperSlide} from "swiper/react";
import {base64ToFile, iif, placeholder} from "@/utils";
import {Flex, Popover, PopoverInstance, Toast,} from "react-vant";
import 'swiper/css';
import {GrAddCircle} from "react-icons/gr";
import React, {createContext, PropsWithChildren, ReactNode, useContext, useRef} from "react";
import {WithClassName} from "@/types";
import {postMakePdf, postTongueSuccess} from "@/api/tongue.api";
/*@ts-ignore*/
import Downloader from "downloadjs";
import {useTranslation} from "react-i18next";
import {PopoverPlacement} from "react-vant/es/popover/PropsType";
import {useTo} from "@/hooks/to";
import useSWR from "swr";
import {ThreeDots} from "@/components/ThreeDots";
import {ChargeLoading} from "@/components/ChargeLoading";
import {WithTypeWrite} from "@/components/WithTypeWrite";

const maskCss = css`
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: -webkit-linear-gradient(180deg, rgba(7, 7, 7, 0.5) 10%, rgba(0, 0, 0, 0)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(180deg, rgba(7, 7, 7, 0.5) 10%, rgba(255, 255, 255, 0)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
`;

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
                ` rounded-20px  mr-36px text-26px font-bold 
                                            text-white 
                                            bg-#FFF 
                                            h-216px
                                            animate-fade-in
                                            w-full w-205px
                                            py-24px  px-12px 
                                            w-12em overflow-hidden relative
                                            truncate`
            )}
        >
            <span className={cx('absolute z-10')}>{item.name}</span>

            <div className={cx(`absolute size-full z-0 left-0 top-0 `, maskCss)}>
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
                        className={cx("relative w-368px flex  p-12px relative flex-col gap-20px text-white  bg-white box-border ", maskCss)}>

                        <div className={cx(`absolute w-full h-full z-0 top-0 left-0`)}>
                            <Image src={item.pic}
                                   className={cx("size-full ")}
                                   fit={"fill"}/>
                        </div>
                        <div className={cx('w-95% box-border h-full  z-10')}>
                            <div text-28px font-bold className={cx('break-all z-10')}>{item.name}</div>
                            <div
                                className={cx("min-h-200px text-18px overflow-y-auto max-h-250px z-10")}>
                                {item.introduce}
                            </div>
                        </div>


                    </div>
                </Popover>
            </div>

        </div>

    </div>;

}

function DrinkGoodsList(props: WithClassName<PropsWithChildren>) {
    const result = useParserResult();


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

const ResultContext = createContext<IParserResult>({
    state: "null",
    she: {
        chihen: "",
        dianci: "",
        houbotai: "",
        shese: "",
        taise: "",
    },
    result: {
        drinks: [] as IGoodsItem[],
        sups: [] as IGoodsItem[],
        translate: ''
    },
    data: "",
    ti_zhi: ""
});
const useParserResult = () => useContext(ResultContext);

const stash = (value: any) => sessionStorage.setItem("stash", JSON.stringify(value));
const getStash = () => {
    try {
        return JSON.parse(sessionStorage.getItem("stash")!);
    } catch {
        return undefined;
    }
};

export const Route = createFileRoute('/result')({

    component: () => {
        const [{base64}] = useAtomNeedToParser();
        const {t} = useTranslation(undefined, {keyPrefix: "result"});
        const to = useTo();
        let _destoryed = false;
        const {isLoading, data: result, error} = useSWR<IParserResult>(() => base64, async (base64: string) => {
            const file = base64ToFile(base64);
            const error = (message: string) => {
                Toast.fail((message ?? "解析出错！"));
                return setTimeout(() => {
                    to("/").then(r => {
                    });
                });
            };
            return new Promise((resolve) => {
                const stashed = getStash();
                let resolver: PromiseLike<IParserResult>;
                if (stashed && stashed.base64 === base64) {
                    resolver = Promise.resolve(stashed.result);
                } else {
                    resolver = postTongueSuccess({
                        file: file
                    });
                }
                resolver.then((result: IParserResult) => {
                    if (_destoryed) return;
                    if (result.state !== "yes") {
                        error(result.data);
                        return Promise.reject("解析出错！");
                    }
                    stash({result: result, base64});
                    return Promise.all(result.result.sups.concat(result.result.drinks)
                        .map((item) => {
                            return new Promise((resolve, reject) => {
                                const img = new window.Image();
                                img.src = item.pic;
                                img.onload = () => {
                                    resolve(null);
                                };
                                /*@ts-ignore*/
                                item.pic = img;
                            }).then(() => {
                                resolve(result);
                            });
                        }));
                });
            });
        }, {
            shouldRetryOnError: false,
            keepPreviousData: true,
        });
        if (error) {
            return;
        }
        return <section size-screen bg-white>
            <NavBar title={t("舌像综合分析")} back={"/capture"}></NavBar>
            <ResultContext.Provider value={result!}>
                <ParserResult isLoading={isLoading}></ParserResult>
            </ResultContext.Provider>
        </section>;
    },
});


function ParserResult({isLoading}: { isLoading: boolean }) {
    const result = useParserResult();

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
            key: 'leihen',
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
        >
            <SwiperSlide className={cx({
                'w-80%! relative right-2em': !!result?.result?.sups.length,
                ' px-48px': !result?.result?.sups.length,
            })}>
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
                                        className={cx('flex-center text-white h-full pt-12px',
                                            iif(order < 3, 'border-b-solid border-1px', '')
                                        )}>
                                        <div className={cx("gap-12px text-center")}>
                                            <span className={cx("text-28px block w-full")}>{label}</span>
                                            <div
                                                className={cx("text-18px truncate min-h-3em relative")}>
                                                {
                                                    isLoading ?
                                                        <ThreeDots/> :
                                                        placeholder(
                                                            <WithTypeWrite>{result?.she?.[key as keyof typeof result.she]}</WithTypeWrite> as ReactNode,
                                                            <ThreeDots/>)!
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Flex.Item>)
                            }
                        </Flex>
                    </div>

                    <div flex flex-col w-full gap-20px overflow-hidden>
                        <div flex w-full justify-between items-center>
                            <strong font-bold text-28px>{t('舌象释义与通常伴随的症状')}</strong>
                        </div>
                        <div className={cx("w-full min-h-200px",)}>
                            {
                                isLoading ?
                                    null :
                                    <div font-800 text-24px text-justify className={cx("animate-fade-in ",)}>
                                        {t("您的体质是：")}{placeholder(result?.ti_zhi, "")}
                                    </div>
                            }
                            {
                                isLoading ?
                                    null :
                                    <div font-500 text-24px text-justify className={cx("animate-fade-in", css`
                                        text-indent: 1em;
                                    `)}>
                                        {placeholder(result?.result?.translate, "")}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            {
                map(result?.result?.drinks ?? [], (drink, index) => <SwiperSlide
                    className={cx("box-border w-80%! relative right-2em ")}
                    key={index}
                >
                    <div className={cx("flex flex-col gap-24px animate-fade-in")}>
                        <div
                            className={cx(" bg-#FFCEEC overflow-hidden  h-400px rounded-18px box-border")}>


                            <div
                                className={cx(`inline-block  h-400px 
                                               w-full text-white
                                                gap-20px relative`,
                                    maskCss
                                )
                                }>
                                <div className={cx(" flex flex-col z-10 absolute p-36px")}>
                                    <span
                                        className={cx('w-12em truncate text-36px mt-12px')}> {drink.name}  </span>
                                    <span
                                        className={cx('text-28px')}> {drink.introduce}</span>

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


        {
            !isLoading ?
                <>
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
                        className={cx("  bottom-157px bg-primary text-white text-32px px-20px mt-12px py-15px outline-none border-none rounded-24px")}>
                        {t("点击生成完整报告")}
                    </button>
                </>
                : <ChargeLoading></ChargeLoading>
        }

    </div>;
}
