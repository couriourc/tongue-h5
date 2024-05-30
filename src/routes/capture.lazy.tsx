import {createLazyFileRoute} from '@tanstack/react-router';
import {CameraPro, CameraProExposed} from "@/components/CameraPro";
import {cx} from "@emotion/css";
import {useEffect, useRef} from "react";
import {useTo} from "@/hooks/to";
import {Image} from "@/components/Image";
import {ArrowLeft} from "@react-vant/icons";
import {GrPowerCycle} from "react-icons/gr";
import {useFileDialog} from "@reactuses/core";
import {postTongueDetection} from "@/api/tongue.api";

export const Route = createLazyFileRoute('/capture')({
    component: () => {
        const camera = useRef<CameraProExposed>(null);
        const to = useTo();
        const [file, open] = useFileDialog(
            {
                multiple: false,
                accept: ".png,.svg,.jpeg,.tif,.bmp,.jpg"
            }
        );


        async function handlePostTongueDetection(file: File) {
            const result = await postTongueDetection({
                file: file
            });
            await to("/result");
        }

        useEffect(() => {
            console.log(file);
            if (!(file && file.length)) return;
            handlePostTongueDetection(file[0])
                .then(() => {
                });
        }, [file]);
        return <section text-white h-screen w-screen>
            <div flex justify-between w-full z-1000 text-28px fixed top-64px px-24px>
                <div className={cx("size-64px")} onClick={() => to("/")}><ArrowLeft/></div>
                <span>使用教程</span>
            </div>
            <div w-full fixed z-200 className={"top-40% left-50% -translate-50% flex flex-center flex-col gap-48px"}>
                <div flex-col flex gap-24px flex-center text-36px>
                    <span>请拍摄舌面</span>
                    <span text={"20px #828384"}>舌体放松，舌面平展，舌尖略向下，口张大不要太用力</span>
                </div>
                <Image src={"face"} className={cx("w-310px")}></Image>
            </div>
            <div className={"px-32px flex gap-12px flex-col pt-242px gap-78px z-0"}>
                <div card-shadow w-screen h-screen fixed top-0 left-0 bg={"#1e2022"} m-auto rounded={'36px'}>
                    <CameraPro ref={camera}/>
                </div>
            </div>
            <div fixed bottom-0 h-328px w-full
                 flex
                 className={cx('bg-#030202')}
            >
                <div className={cx("absolute top-60% left-132px -translate-y-50%")} onClick={() => open()}>
                    <Image className={cx("w-58px")} src={"gallary_add"}></Image>
                    <span>相册上传</span>
                </div>
                <div flex flex-col flex-shrink-zero flex-center gap-24px
                     className={cx("absolute top-50% left-50% -translate-50%")}>
                    <button m-auto bg-transparent border-solid border-1px border-white py-12px rounded-2em
                            text-white flex-center gap-12px>
                        <GrPowerCycle className={"text-24px"}></GrPowerCycle>
                        <span>翻转相机</span>
                    </button>
                    <div border-solid border-1px border-white rounded-full flex-center p-10px>
                        <button size-128px bg-primary
                                className={"border-solid border-2px  rounded-full"}
                                onClick={() => to("/result")}
                        />
                    </div>
                </div>
            </div>
        </section>;
    }
});