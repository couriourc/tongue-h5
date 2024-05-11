import { useRef } from "react";
import { NavBar } from "@/components/Navbar";
import { css, cx } from "@emotion/css";
import SwitchCamera from "@/assets/switch-camera.png";
import { useNavigate } from "react-router";
import { CameraPro, CameraProExposed } from "@/components/CameraPro";
import { AlertTip } from "@/components/AlertTip";
export function Capture() {
    const camera = useRef<CameraProExposed>(null);
    const to = useNavigate();

    function toCheckResult() {
        console.log(camera.current!.capture())
        // to({
        //     pathname: '/result'
        // })
    }
    function toSwitch() {
        camera.current!.switch();
    }
    return (
        <>
            <NavBar title={"舌象拍摄"}></NavBar>
            <div className={"px-32px flex gap-12px flex-col pt-242px gap-78px"}>
                <AlertTip>
                    请将舌体放置拍摄框内
                </AlertTip>
                <div card-shadow w-600px h-600px bg-white m-auto rounded={'36px'}>
                    <CameraPro ref={camera} />
                </div>
            </div>
            <div fixed bottom-0 h-187px w-full bg-white
                items-center
                className={cx(css`
                     box-shadow: 0px 0px 13px 0px #EDEDEDB2;
                 `)}
            >
                <button size-140px bg-primary
                    className={"border-solid border-2px border-#BF6B00 rounded-full -translate-x-50% ml-50% mt-34px"}
                    onClick={toCheckResult}
                />
                <img src={SwitchCamera} alt={'switch'}
                    onClick={() => toSwitch()}
                    size-100px
                    className={'absolute right-115px top-54px cursor-pointer'}
                    role={"button"}
                />
            </div>
        </>
    );
}
