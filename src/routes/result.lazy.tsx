import {createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {AiFillHeart} from "react-icons/ai";
import {Arrow} from "@react-vant/icons";
import {css, cx} from "@emotion/css";
import {map} from "underscore";
import {Grid} from 'react-vant';
import {Flex} from 'react-vant';
import {iif} from "@couriourc/utils";

export const Route = createLazyFileRoute('/result')({
    component: () => <section size-screen bg-white>
        <NavBar title={"舌像综合分析"} back={"/capture"}></NavBar>
        <div flex items-center flex-col gap-48px mt-12px>
            <div
                className={cx(`
                overflow-x-hidden whitespace-nowrap w-690px
                `)}>
                <div className={"inline-block bg-primary w-560px h-400px rounded-18px overflow-hidden"}>
                    <Flex wrap="wrap" className={cx("w-560px h-400px box-border px-48px ")}>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white border-b-solid border-1px h-full pt-12px')}>
                                <div>
                                    x
                                </div>
                            </div>
                        </Flex.Item>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white border-b-solid border-1px h-full')}>x
                            </div>
                        </Flex.Item>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white border-b-solid border-1px h-full')}>x
                            </div>
                        </Flex.Item>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white  border-1px h-full')}>x
                            </div>
                        </Flex.Item>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white  border-1px h-full')}>x
                            </div>
                        </Flex.Item>
                        <Flex.Item span={8}>
                            <div
                                className={cx('text-36px flex-center text-white  border-1px h-full')}>x
                            </div>
                        </Flex.Item>
                    </Flex>
                </div>
                <div className={"inline-block bg-#FFCEEC w-560px h-400px rounded-18px ml-48px "}></div>
            </div>
            {/*<div >*/}
            {/*    <div className={"inline-block  ml-12px bg-primary w-690px h-512px rounded-18px"}></div>*/}
            {/*</div>*/}
            <div flex flex-col w-full px-48px gap-20px>
                <div flex w-full justify-between items-center>
                    <span font-bold text-28px>舌象释义与通常伴随的症状</span>
                    <div flex-center text-26px><AiFillHeart color={"#FAC22D"}/><span
                        text={"#A2A2C8 "}>1234已诊断</span></div>
                </div>
                <div>
                    <div text-24px>
                        根据舌象显示，您舌尖红说明有心火、白腻苔提示略有痰湿。
                        您有心火、略有痰湿提示可能有糖脂代谢素乱的风险，
                    </div>
                    <div font-bold text-28px>
                        伴随的症状：口中粘腻、肢体沉重、大便溏薄有痰、易困倦、头晕。
                        头重如裹
                    </div>
                </div>
            </div>
            <div flex flex-col w-full px-48px gap-20px>
                <div flex w-full justify-between items-center>
                    <span font-bold text-28px>诊断推荐药膳</span>
                    <div className={cx("text-#A2A2C8 text-26px flex-center")}>
                        <span>more</span><Arrow/>
                    </div>
                </div>
                <ul className={cx("h-fit box-border overflow-x-auto whitespace-nowrap py-12px scrollbar-none")}>
                    {
                        map(["空空空空空空空空空空", "空空空空空空空空空空", "空空空空空空空空空空"],
                            (item, key) =>
                                <li
                                    className={cx(
                                        `inline-block rounded-20px mr-36px text-26px font-bold text-white bg-#9087E4 w-277px h-216px py-24px px-12px w-12em truncate`
                                    )}
                                    key={key}
                                >
                                    {item}
                                </li>
                        )
                    }

                </ul>
            </div>

            <button
                className={cx(" fixed bottom-157px bg-primary text-white text-32px px-20px py-15px outline-none border-none rounded-24px")}>点击生成完整报告
            </button>
        </div>
    </section>
});
