import {createLazyFileRoute} from '@tanstack/react-router';
import {NavBar} from "@/components/Navbar";
import {AiFillHeart} from "react-icons/ai";
import {Arrow} from "@react-vant/icons";
import {cx} from "@emotion/css";

export const Route = createLazyFileRoute('/result')({
    component: () => <section size-screen bg-white>
        <NavBar title={"舌像综合分析"} back={"/capture"}></NavBar>
        <div flex items-center flex-col gap-48px mt-12px>
            <div>
                <div className={"bg-primary w-690px h-512px rounded-18px"}></div>
            </div>
            <div flex flex-col w-full px-48px gap-20px>
                <div flex w-full justify-between items-center>
                    <span font-bold text-28px>舌象释义与通常伴随的症状</span>
                    <tspan flex-center text-26px><AiFillHeart color={"#FAC22D"}/><span
                        text={"#A2A2C8 "}>1234已诊断</span></tspan>
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
                    <tspan className={cx("text-#A2A2C8 text-26px flex-center")}><span>more</span><Arrow/></tspan>
                </div>
            </div>

            <button className={cx(" fixed bottom-157px bg-primary text-white text-32px px-20px py-15px outline-none border-none rounded-24px")}>点击生成完整报告</button>
        </div>
    </section>
});
