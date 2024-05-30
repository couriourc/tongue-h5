import {createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {cx} from "@emotion/css";
import {map} from "underscore";
import {Flex} from 'react-vant';
import {useAtomParserResult} from "@/store";
import {iif, placeholder} from "@/utils";

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
            <div flex items-center flex-col gap-48px mt-12px>
                <div
                    className={cx(`
                overflow-x-hidden whitespace-nowrap w-690px
                `)}>
                    <div className={"inline-block bg-primary w-560px h-400px rounded-18px overflow-hidden"}>
                        <Flex wrap="wrap" className={cx("w-560px h-400px box-border px-48px text-36px")}>
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
                    <div className={"inline-block bg-#FFCEEC w-560px h-400px rounded-18px ml-48px "}></div>
                </div>
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
        </section>;
    }
});
