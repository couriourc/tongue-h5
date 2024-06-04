import {css, cx} from "@emotion/css";

const loader_css = css`
    position: relative;
    width: 40px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    .dot {
        width: 5px;
        height: 5px;
        background: #FFF;
        border-radius: 50%;
        justify-content: space-between;
    }

    @-webkit-keyframes dot-jump {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
        }
    }

    @keyframes dot-jump {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
        }
    }

    .dot1 {
        -webkit-animation: dot-jump 1s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
        animation: dot-jump 1s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    }

    .dot2 {
        -webkit-animation: dot-jump 1s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
        animation: dot-jump 1s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    }

    .dot3 {
        -webkit-animation: dot-jump 1s 0.8s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
        animation: dot-jump 1s 0.8s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
    }
`;

export function ThreeDots() {

    return <div className={cx("loader loader-3", loader_css)}>
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
    </div>;
}
