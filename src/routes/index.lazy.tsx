import {createLazyFileRoute} from '@tanstack/react-router';
import {css, cx} from "@emotion/css";
import CameraPng from "@/assets/camera.png";
import {Image} from "@/components/Image";
import {useTo} from "@/hooks/to";
import dayjs from "dayjs";
import {Tabbar as VantTabbar} from "react-vant";

const stepper = [
    {label: '上传舌象', icon: "tongue"},
    {label: '免费检测', icon: "scan"},
    {label: '专业分析', icon: "hos"},
] as const;

export const Route = createLazyFileRoute('/')({
    component: () => {
        const to = useTo();
        return <section className={cx('flex flex-col items-center gap-12px relative w-full ')}>
            <div className={cx("bg-primary h-714px w-full flex flex-col flex-center text-white px-96px")}>
                <div className={cx('h-218px pt-108px w-full')}>
                    <span className={cx(" text-35px text-white")}>Welcome to 汉方</span>
                </div>
                <div className={cx('h-full flex flex-center flex-col gap-28px text-36px')}
                     onClick={() => to("/capture")}>
                    <img src={CameraPng} alt={'camera'}/>
                    <span>点击上传舌象</span>
                </div>

            </div>
            <div className={cx("bg-white w-full py-24px box-border")}>
                <div className={cx('font-bold text-29px px-38px')}>汉方舌诊</div>
                <div>
                    <div
                        className={cx('w-full m-auto bg-#FFF  rounded-6px h-254px px-36px box-border flex-center ')}>
                        <div flex m-auto w-full justify-center>
                            {
                                stepper.map(({label, icon,}, index) => {
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
                                                <Image className={"w-120px z-1"} src={icon} alt={label}/>
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
                <div className={cx('font-bold text-29px mb-36px')}>每日更新</div>

                <div flex gap-36px>
                    <div className={cx(' w-14em text-28px')}>
                        <div className={cx('w-inherit break-after-all font-bold mb-12px')}>
                            预防新冠病毒感染的症状预防新
                            冠病毒感染的症状
                        </div>
                        <div>
                            {dayjs().format("YYYY-MM-DD  hh:mm:ss")}
                        </div>
                    </div>
                    <div className={'w-full bg-black'}></div>
                </div>
            </div>
            <Tabbar></Tabbar>
        </section>;
    }
});
const Tabbar = () => {
    return <VantTabbar border={true} fixed={true}>
        <VantTabbar.Item>
            <Image className={cx('w-48px')} src={"home"}></Image>
        </VantTabbar.Item>
        <VantTabbar.Item>
            <Image className={cx('h-48px')} src={"maintain"}></Image>
        </VantTabbar.Item>
        <VantTabbar.Item>
            <Image className={cx('h-48px')} src={"detail"}></Image>
        </VantTabbar.Item>
    </VantTabbar>;
};
