import React, {useEffect, useRef, useState} from 'react';
import {css, cx} from "@emotion/css";
import TWEEN, {Tween} from "@tweenjs/tween.js";

function animate(time: number) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

requestAnimationFrame(animate);
//import './index.less'
const loading_css = css`
    width: 100vw;
    height: 60vh;
    position: fixed;
    bottom: 0;
    z-index: 999;

    .text {
        width: 200px;
        text-align: center;
        z-index: 9;
        font-size: 30px;
        color: #333333;
        position: absolute;
        left: 50%;
        top: 24%;
        transform: translate(-50%, 0%);
    }

    .contrast {
        width: 100%;
        height: 100%;
        overflow: hidden;
        filter: contrast(15) hue-rotate(0);
        position: relative;
        animation: hueRotate 6s linear infinite;

        span {
            background: #0E98A4;
            position: absolute;
            bottom: 0;
            border-radius: 100px 100px 0 0;
            filter: blur(5px);
            animation: moveUp ease-in-out infinite;

            &:nth-child(1) {
                width: 20px;
                height: 20px;
                left: 50%;
                animation-duration: 4s;
                animation-delay: 2s;
            }

            &:nth-child(2) {
                width: 22px;
                height: 22px;
                left: 54%;
                animation-duration: 4.2s;
                animation-delay: 4s;
            }

            &:nth-child(3) {
                width: 24px;
                height: 24px;
                left: 45%;
                animation-duration: 3s;
                animation-delay: 1s;
            }

            &:nth-child(4) {
                width: 20px;
                height: 22px;
                left: 54%;
                animation-duration: 5s;
                animation-delay: 0s;
            }

            &:nth-child(5) {
                width: 22px;
                height: 22px;
                left: 52%;
                animation-duration: 3.5s;
                animation-delay: 5s;
            }

            &:nth-child(6) {
                width: 20px;
                height: 20px;
                left: 50%;
                animation-duration: 4.7s;
                animation-delay: 1.2s;
            }

            &:nth-child(7) {
                width: 22px;
                height: 22px;
                left: 54%;
                animation-duration: 2.5s;
                animation-delay: 3.5s;
            }

            &:nth-child(8) {
                width: 24px;
                height: 24px;
                left: 51%;
                animation-duration: 5.6s;
                animation-delay: 4.2s;
            }

            &:nth-child(9) {
                width: 26px;
                height: 26px;
                left: 42%;
                animation-duration: 5.2s;
                animation-delay: 4s;
            }

            &:nth-child(10) {
                width: 26px;
                height: 22px;
                left: 54%;
                animation-duration: 3.8s;
                animation-delay: 4.3s;
            }

            &:nth-child(11) {
                width: 22px;
                height: 22px;
                left: 42%;
                animation-duration: 4.2s;
                animation-delay: 0.3s;
            }

            &:nth-child(12) {
                width: 24px;
                height: 24px;
                left: 46%;
                animation-duration: 4.6s;
                animation-delay: 2.0s;
            }

            &:nth-child(13) {
                width: 22px;
                height: 22px;
                left: 48%;
                animation-duration: 3.8s;
                animation-delay: 3.2s;
            }

            &:nth-child(14) {
                width: 26px;
                height: 22px;
                left: 55%;
                animation-duration: 5.2s;
                animation-delay: 2.9s;
            }

            &:nth-child(15) {
                width: 26px;
                height: 22px;
                left: 52%;
                animation-duration: 4.9s;
                animation-delay: 4.2s;
            }
        }

        .button {
            width: 150px;
            height: 50px;
            background: #0E98A4;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0);
            border-radius: 100px 100px 0 0;
            filter: blur(5px);
        }
    }

    .circle {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 10px;
        left: 50%;
        margin-left: -150px;
        box-sizing: border-box;
        filter: blur(8px);
        animation: circleRotate 6s linear infinite;

        &::before {
            content: "";
            height: 200px;
            width: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0);
            background: #0E98A4;
            border-radius: 42% 38% 62% 49% / 45%;
        }

        &::after {
            content: "";
            width: 176px;
            height: 178px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}


@keyframes hueRotate {
    0% {
        filter: contrast(15) hue-rotate(0);
    }

    100% {
        filter: contrast(15) hue-rotate(360deg);
    }
}

@keyframes circleRotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes moveUp {
    0% {
        bottom: 0;
    }

    100% {
        bottom: calc(100% - 265px);
    }
`;
export const ChargeLoading: React.FC<any> = () => {
    const [percentage] = useState(0);
    const text = [
        [20, "正在检测舌质量",],
        [40, "正在检测体质",],
        [60, "正在推理你的舌像分析",],
        [80, "正在处理推进你的药膳"],
    ] as const;
    const curStep = useRef<number>(0);
    const [curPercentage, setCurPercentage] = useState<[number, string]>(text[0]);

    useEffect(() => {

        let t: Tween<{ num: number }>;
        let timeout: string | number | NodeJS.Timeout | undefined;

        function animation(from: number, to: number): Tween<{ num: number }> {
            return new Tween({num: from})
                .to({num: to})
                .onUpdate(({num}) => {
                    setCurPercentage(() => [num.toFixed(2) as unknown as number, text[curStep.current][1]]);
                })
                .onComplete(() => {
                    if (curStep.current >= text.length - 1) {
                        return;
                    }
                    curStep.current++;
                    timeout = setTimeout(() => {
                        t = animation(text[curStep.current][0], text[curStep.current + 1][0]).start();
                    }, 1000);
                })
                .start();
        }

        t = animation(text[curStep.current][0], text[curStep.current + 1][0]).start();
        return () => {
            t.stop();
            clearTimeout(timeout);
        };
    }, []);
//    20%的时候 有个文案  （比如正在检测舌质量）
//到40%的时候  文案 正在检测体质
//    60% 的时候 文案中 正在推理你的舌像分析
//    到80%的时候  文案  正在处理推进你的药膳
    return (
        <div className={cx(loading_css)}>
            <div className="text">
                <div>{curPercentage[0]}%</div>
                <div className={cx("text-28px")}>{curPercentage[1]}</div>
            </div>
            <div className="contrast">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* 底部的 */}
                <div className="circle"></div>
                {/* 下面的 */}
                <div className="button"></div>
            </div>
        </div>
    );
};

