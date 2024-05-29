import {createLazyFileRoute} from '@tanstack/react-router';
import Face from "@/assets/face.png";
import Scan from "@/assets/scan.png";
import Diagnosis from "@/assets/diagnosis.png";
import {cx} from "@emotion/css";
import CameraPng from "@/assets/camera.png";
import {Image} from "@/components/Image";
import {useNavigateTo} from "@/hooks/to";

const stepper = [
    {label: '上传舌象', icon: Face},
    {label: '免费检测', icon: Scan},
    {label: '专业分析', icon: Diagnosis},
] as const;

export const Route = createLazyFileRoute('/')({
    component: () => {
        const to = useNavigateTo();
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
            <div className={cx("bg-white h-421px w-full")}>
                <h3 className={cx('text-29px px-38px')}>汉方舌诊</h3>
                <div>
                    <div
                        className={cx('w-full m-auto bg-#FFF  rounded-6px h-254px pt-33px px-36px box-border flex-center ')}>
                        <div flex m-auto w-full justify-center>
                            {
                                stepper.map(({label, icon,}, index) => {
                                    return <div key={label} flex flex-col gap-12px justify-start>
                                        <div flex items-center relative>
                                            <div
                                                className={cx('w-120px h-120px  rounded-full bg-primary flex items-center justify-center')}
                                            >
                                                <Image className={"w-64px"} src={icon} alt={label}/>
                                            </div>
                                            {index === stepper.length - 1 ? null :
                                                <div className={"w-100px h-86px flex items-center justify-center"}>
                                                    <span text={"#aee4e9 48px"}>&gt;</span>
                                                    <span text={"#5EC6CF 48px"}>&gt;</span>
                                                    <span text={"#0E98A4 48px"}>&gt;</span>
                                                </div>}
                                        </div>
                                        <span className={'text-28px font-bold ml-12px'}> {label}</span>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("h-400px bg-white w-full")}>
                <h3 className={cx('text-29px px-98px')}>每日更新</h3>
            </div>
        </section>;
    }
});
