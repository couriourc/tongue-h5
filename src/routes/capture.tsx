import {createFileRoute} from '@tanstack/react-router';
import {CameraPro, CameraProExposed} from "@/components/CameraPro";
import {css, cx} from "@emotion/css";
import {useMemo, useRef, useState} from "react";
import {useTo} from "@/hooks/to";
import {Image} from "@/components/Image";
import {ArrowLeft} from "@react-vant/icons";
import {GrPowerCycle} from "react-icons/gr";
import {useFileDialog} from "@reactuses/core";
import {base64ToFile, fileToBase64} from "@/utils";
import {Loader} from "@/components/Loading";
import {useAtomNeedToParser} from "@/store";
import {useTranslation} from "react-i18next";
export const Route = createFileRoute('/capture')({
    component: () => {
        const {t} = useTranslation(undefined, {keyPrefix: "capture"});
        const [_target, setTarget] = useAtomNeedToParser();
        const camera = useRef<CameraProExposed>(null);
        const to = useTo();
        const [_files, open] = useFileDialog({accept: "*"});
        const [isLoading, setLoading] = useState<boolean>();
        const MemoCamera = useMemo(() => CameraPro, []);

        async function handlePostTongueDetection(img: string) {
            setTarget({base64: img});
            return to("/result", {
                search: {
                    back: '/capture'
                }
            });
        }

        function handleCapture() {
            const img = camera.current!.capture();
            return handlePostTongueDetection(img);
        }

        async function handleOpen() {
            const files = await open();
            if (!(files && !!files.length)) return;
            const base64 = await fileToBase64(files[0]);
            return handlePostTongueDetection(base64);
        }


        function handleSwitchFace() {
            const $camera = camera.current!;
            return $camera.switch();
        }

        return <section text-white h-screen w-screen touch-none>

            <div flex justify-between w-full z-200 text-28px fixed top-64px px-24px>
                <div className={cx("size-64px")} onClick={() => to("/")}><ArrowLeft/></div>
                <span>{t('使用教程')}</span>
            </div>

            <div w-full fixed z-1 h-full
                 className={cx("top-40% left-50% -translate-50% flex flex-center flex-col gap-48px",
                     css`
                         background: rgba(0, 0, 0, 0.3);
                     `)}>
                <div flex-col flex gap-24px flex-center text-36px>
                    <span>{t('请拍摄舌面')}</span>
                    <span text={"20px #828384"}>{t("舌体放松，舌面平展，舌尖略向下，口张大不要太用力")}</span>
                </div>
                <Image src={"face"} showLoading={false} className={cx("w-400px bg-transparent")}></Image>
            </div>

            <MemoCamera className={cx(`size-screen fixed top-0 left-0 bg-#1e2022`)} ref={camera}/>

            <div fixed bottom-0 h-328px w-full
                 flex z-3
                 className={cx('bg-#030202')}
            >
                <div className={cx("absolute top-60% left-132px -translate-y-50% flex flex-col flex-center")}
                     onClick={() => handleOpen()}>
                    <Image className={cx("w-58px")} src={"gallary_add"}></Image>
                    <span text-26px>{t('相册上传')}</span>
                </div>
                <div flex flex-col flex-shrink-zero flex-center gap-24px
                     className={cx("absolute top-50% left-50% -translate-50%")}>
                    <button m-auto
                            text-white bg-transparent
                            border-solid border-1px border-white
                            py-12px rounded-2em
                            flex-center gap-12px
                            onClick={() => handleSwitchFace()}
                    >
                        <GrPowerCycle className={"text-24px"}></GrPowerCycle>
                        <span>{t('翻转相机')}</span>
                    </button>
                    <div border-solid border-1px border-white rounded-full flex-center p-10px>
                        <button size-128px bg-primary
                                className={"border-solid border-2px  rounded-full"}
                                onClick={() => {
                                    handleCapture();
                                }}
                        />
                    </div>
                </div>
            </div>
            {isLoading ? <Loader></Loader> : null}
        </section>;
    }
});
