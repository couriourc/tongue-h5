import Lottie from 'react-lottie';
import {memo} from "react";
import animationData from "@/assets/lottie/loading.json";
import {cx} from "@emotion/css";

export const LoadingAnimation =
    memo(() => {
        return <Lottie options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
                className: cx(`color-[var(--theme-primary)]`)
            }
        }} height={128} width={128}
        />;

    });
