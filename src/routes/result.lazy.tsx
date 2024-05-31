import {createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {cx} from "@emotion/css";
import {map} from "underscore";
import {useAtomParserResult} from "@/store";
import {Image} from "@/components/Image";
import {Swiper, SwiperSlide} from "swiper/react";
import {iif, placeholder} from "@/utils";
import {Flex} from "react-vant";
import 'swiper/css';

export const Route = createLazyFileRoute('/result')({
    component: () => {
        const [result] = useAtomParserResult();
        console.log(result);
        const labels = [
            {
                key: 'shese',
                label: '舌色',
            }, {
                key: 'dianci',
                label: '点刺',
            }, {
                key: 'liewen',
                label: '裂纹',
            }, {
                key: 'taise',
                label: '苔色',
            }, {
                key: 'houbotai',
                label: '苔质',
            }, {
                key: 'chihen',
                label: '齿痕',
            },
        ] as const;
        return <section size-screen bg-white>
            <NavBar title={"舌像综合分析"} back={"/capture"}></NavBar>

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
                                                {placeholder(result.she[key as keyof typeof result.she], '无信息')}
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
                                到底了
                            </span>
                                </div>, null
                            )}
                        </SwiperSlide>)
                    }
                </Swiper>

                <div flex flex-col w-full px-48px gap-20px w-690px overflow-hidden>
                    <div flex w-full justify-between items-center>
                        <span font-bold text-28px>舌象释义与通常伴随的症状</span>
                    </div>
                    <div>
                        <div text-24px>
                            {result.result.translate}
                        </div>
                    </div>
                </div>
                <div flex flex-col w-full px-48px gap-20px>
                    <div flex w-full justify-between items-center>
                        <span font-bold text-28px>诊断推荐药膳</span>
                        <div className={cx("text-#A2A2C8 text-26px flex-center")}>
                            <span></span>
                        </div>
                    </div>
                    <ul className={cx("h-fit w-690px  box-border overflow-x-auto whitespace-nowrap py-12px scrollbar-none")}>
                        {
                            map(result.result.sups,
                                (item, key) =>
                                    <li
                                        className={cx(
                                            `inline-block rounded-20px relative mr-36px text-26px font-bold overflow-visible 
                                            text-white 
                                            bg-#9087E4 
                                            w-277px 
                                            h-216px 
                                            py-24px 
                                            px-12px 
                                            w-12em 
                                            truncate`
                                        )}
                                        key={key}
                                    >
                                        <span className={cx('z-10')}>{item.name}</span>
                                        <div className={cx(`absolute w-full h-full z-0`)}>
                                            <Image src={item.pic}></Image>
                                        </div>
                                    </li>
                            )
                        }

                    </ul>
                </div>

                <button
                    className={cx(" fixed bottom-157px bg-primary text-white text-32px px-20px py-15px outline-none border-none rounded-24px")}>点击生成完整报告
                </button>
            </div>
        </section>;
    }
});
