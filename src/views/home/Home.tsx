import { Swiper } from "@/components/Swiper";
import { BrandWithName } from "@/components/Brand";

import SwiperItem from "@/assets/swiper-item.png";
import Scan from "@/assets/scan.png";
import Diagnosis from "@/assets/diagnosis.png";
import Camera from "@/assets/camera.png";
import Arrow from "@/assets/arrow.png";

import Face from "@/assets/face.png";
import { cx } from "@emotion/css";
import { ReadPrivacy } from "@/components/Privacy";
import { useNavigate } from "react-router";
import { Image } from "@/components/Image";
export function Home() {
    const stepper = [
        { label: '上传舌象', icon: Face },
        { label: '免费检测', icon: Scan },
        { label: '专业分析', icon: Diagnosis },
    ] as const;

    const to = useNavigate();

    function toCapturePhoto() {
        to({
            pathname: '/capture'
        });
    }

    return <section className={cx('flex flex-col items-center  relative')}>
        <BrandWithName className={'absolute top-12px left-12px'} />
        <main className={'relative top-186px flex gap-100px justify-center flex-col'}>
            <div className={"w-686px max-h-339px m-auto p-12px  bg-white rounded-6px"}>
                <Swiper images={[SwiperItem]}></Swiper>
            </div>
            <button className={cx("bg-white h-330px w-330px border-none rounded-full m-auto flex-center flex-col ")}
                onClick={toCapturePhoto}
            >
                <img src={Camera} className={"w-120px"} alt={"camera"} />
                <span className={cx('font-500 text-36px')}>上传图像</span>
            </button>
            <div
                className={cx('w-686px m-auto bg-#FFF shadow-lg rounded-6px h-254px pt-33px px-46px box-border flex-center ')}>
                <div flex m-auto w-full justify-center>
                    {
                        stepper.map(({ label, icon, }, index) => {
                            return <div key={label} flex flex-col gap-12px justify-start>
                                <div flex items-center relative >
                                    <div
                                        className={cx('w-120px h-120px  rounded-full bg-primary flex items-center justify-center')}
                                    >
                                        <Image w-48px src={icon} alt={'face'} />
                                    </div>
                                    {index === stepper.length - 1 ? null : <Image src={Arrow} alt={'arrow'} className="h-86px " />}
                                </div>
                                <span className={'text-24px ml-12px'}> {label}</span>
                            </div>;
                        })
                    }
                </div>
            </div>

            <ReadPrivacy></ReadPrivacy>
        </main>

    </section>;
}

