import {Swiper} from "@/components/Swiper";
import {BrandWithName} from "@/components/Brand";

import SwiperItem from "@/assets/swiper-item.png";
import Camera from "@/assets/camera.png";
import Arrow from "@/assets/arrow.png";

import Face from "@/assets/face.png";
import {css, cx} from "@emotion/css";
import {Checkbox} from "react-vant";

export function Home() {
    return <section className={cx('flex flex-col items-center px-32px relative')}>
        <BrandWithName className={'absolute top-12px left-12px'}/>
        <main className={'absolute top-186px flex gap-100px justify-center flex-col'}>
            <div className={"w-686px m-auto p-12px  bg-white"}>
                <Swiper images={[SwiperItem]}></Swiper>
            </div>
            <button className={cx("bg-white h-330px w-330px border-none rounded-full m-auto flex-center flex-col ")}>
                <img src={Camera} className={"w-120px"} alt={"camera"}/>
                <span className={cx('font-500 text-36px')}>上传图像</span>
            </button>
            <div
                className={cx('w-686px m-auto bg-#FFF shadow-lg rounded-6px h-254px pt-33px px-46px box-border flex-center ')}>
                <div flex m-auto w-full justify-center>
                    <div flex flex-col gap-12px justify-start>
                        <div flex items-center>
                            <div
                                className={cx('w-120px h-120px rounded-full bg-primary flex items-center justify-center')}>
                                <img className={cx('w-48px')} src={Face} alt={'face'}/>
                            </div>
                            <img src={Arrow} alt={'arrow'} h-86px/>
                        </div>
                        <span text-24px> 上传舌象</span>
                    </div>
                    <div flex flex-col gap-12px justify-start>
                        <div flex items-center>
                            <div
                                className={cx('w-120px h-120px rounded-full bg-primary flex items-center justify-center')}>
                                <img className={cx('w-48px')} src={Face} alt={'face'}/>
                            </div>
                            <img src={Arrow} alt={'arrow'} h-86px/>
                        </div>
                        <span text-24px> 免费检测 </span>
                    </div>
                    <div flex flex-col gap-12px justify-start>
                        <div flex items-center>
                            <div
                                className={cx('w-120px h-120px rounded-full bg-primary flex items-center justify-center')}>
                                <img className={cx('w-48px')} src={Face} alt={'face'}/>
                            </div>
                            <div h-86px/>
                        </div>
                        <span text-24px> 专业分析 </span>
                    </div>
                </div>
            </div>
        </main>

        <div className={cx('fixed bottom-39px left-36px gap-12px flex w-full')}>
            <Checkbox shape='square'></Checkbox><tspan>已阅读并同意<span text-primary>《隐私政策》</span></tspan>
        </div>
    </section>;
}

