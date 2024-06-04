//@ts-nocheck
//import React, {forwardRef, memo, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef} from "react";
//import {FacingModes, getAvailableDevices} from "@/utils/camera";
//import {isSupported} from "@/ployfill";
//import {BiError} from "react-icons/bi";
//import {iif} from "@/utils";
//import {cx} from "@emotion/css";
//import _WebCam from "@/vendor/webcam";
//import {useWindowResize} from "@/hooks/useWindowResize";
//import {noop} from "underscore";
///*@ts-ignore*/
//const Webcam = _WebCam.Webcam;
//const getListOfVideoInputs = async () => {
//    return getAvailableDevices("video");
//};
//
//export interface CameraProExposed {
//    capture(): string;
//
//    switch(): void;
//
//    resume(): void;
//}
//
import {FacingModes} from "@/utils/camera";
//
////export const CameraPro = memo(forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
////    if (!isSupported) return iif(!!props.Error, <>{Error}</>,
////        <div size-full flex flex-center text-32px
////             text-danger bg-black font-fold>
////            <BiError/>
////            {'无相机权限'}
////        </div>);
////    const videoContainer = useRef<HTMLDivElement | null>();
////    console.log(WebCam);
////    useEffect(() => {
////
////    }, []);
////    return <div className={cx('relative')} ref={(ref) => videoContainer.current = ref}>
////    </div>;
////}));
//export const CameraPro = memo(forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
//    if (!isSupported) return iif(!!props.Error, <>{Error}</>,
//        <div size-full flex flex-center text-32px
//             text-danger bg-black font-fold>
//            <BiError/>
//            {t('没有相机权限')}
//        </div>);
//
//    let cur: (typeof FacingModes)[keyof (typeof FacingModes)] = FacingModes.USER;
//    const video = useRef<HTMLVideoElement>();
//    let streamStop = noop;
////    const [cur, setCur] = useState<(typeof FacingModes)[keyof (typeof FacingModes)]>(FacingModes.USER);
//    const tryCapture = async () => {
//        let $video = video.current!;
//        if (!$video) return;
//        //Get the details of video inputs of the device
//        const videoInputs = await getListOfVideoInputs();
//        console.log(cur);
//        //The device has a camera
//        if (videoInputs.length) {
//            navigator.mediaDevices
//                ?.getUserMedia({
//                    audio: false,
//                    video: {
//                        facingMode: cur.toLowerCase(),
//                        sampleSize: window.innerWidth * window.innerHeight,
//                        sampleRate: 1,
//                        width: {
//                            min: window.innerWidth,
//                            max: 2080,
//                        },
//                        height: {
//                            min: window.innerHeight,
//                            max: 1440,
//                        },
//                    },
//                })
//                .then((stream) => {
//                    $video.srcObject = stream;
//                    $video.onloadedmetadata = () => {
//                        $video.play();
//                    };
//                    streamStop = () => {
//                        stream.getTracks().forEach((track) => {
//                            track.stop();
//                        });
//                    };
//                    $video.onpause = streamStop;
//                })
//                .catch((error) => {
//                    console.error(error);
//                });
//        } else {
//            alert("The device does not have a camera");
//        }
//    };
//
//    const stop = () => {
//        let $video = video.current;
//        $video?.pause();
//    };
//    const canvas = useMemo(() => document.createElement("canvas"), []);
//
//    const resumeCamera = () => {
//        return tryCapture();
//    };
//
//
//    useWindowResize(() => {
//        return tryCapture();
//    });
//
//    useImperativeHandle(ref, () => {
//        return {
//            capture() {
//                draw();
//                stop();
//                return canvas.toDataURL("image/jpeg");
//            },
//            switch() {
//                return switchCamera();
//            },
//            resume() {
//                return resumeCamera();
//            }
//        };
//    });
//
//
//    const switchCamera = async () => {
//        const listOfVideoInputs = await getListOfVideoInputs();
//        let $video = video.current!;
//        // The device has more than one camera
//        if (listOfVideoInputs.length > 1) {
//            if (cur === FacingModes.USER) cur = FacingModes.ENVIRONMENT;
//            else cur = FacingModes.USER;
//            /*toNext*/
//            if ($video.srcObject) {
//                stop();
//                clean();
//            }
//            await tryCapture();
//        } else if (listOfVideoInputs.length === 1) {
//            alert("当前只有一个摄像头");
//        } else {
//            alert("无相机权限");
//
//        }
//    };
//
//    const clean = () => {
//        const context = canvas.getContext("2d")!;
//        context.fillStyle = "#AAA";
//        context.fillRect(0, 0, window.innerHeight, window.innerWidth);
//    };
//
//    function draw() {
//        let $video = video.current!;
//        if (!$video) return;
//        const context = canvas.getContext("2d")!;
//        clean();
//        context.drawImage($video, 0, 0, window.innerHeight, window.innerWidth,);
//
//    }
//
//
//    useEffect(() => {
//        let $video = video.current!;
//        if (!$video) return;
//        tryCapture();
//        return () => {
//            streamStop();
//        };
//    }, [video.current]);
//
//    return <>
//        <div className={cx('relative')}>
//            <video className={cx(props.className, 'w-screen! h-screen! object-cover transform-gpu')}
//                   autoPlay
//                   disablePictureInPicture={true}
//                   muted={true}
//                   playsInline
//                   ref={r => video.current = r!}
//                   style={{
//                       transform: cur === FacingModes.USER ? `rotateY(180deg)` : ''
//                   }}
//            />
//        </div>
//    </>;
//}));
import React, {forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useRef} from "react";
import Webcam from "@/vendor/webcam-easy";
import {cx} from "@emotion/css";
import {isSupported} from "@/ployfill";
import {iif} from "@/utils";
import {BiError} from "react-icons/bi";

export interface ICameraProDefault {
    cameraNumber: number;
    className?: string;
    Error?: ReactNode;
}

let cam: Webcam;
export const CameraPro = forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
    if (!isSupported) return iif(!!props.Error, <>{Error}</>,
        <div size-full flex flex-center text-32px
             text-danger bg-black font-fold>
            <BiError/>
            {'没有相机权限'}
        </div>);

    const webcam = useRef<HTMLVideoElement>();
    useEffect(() => {
        cam = new Webcam(webcam.current!, FacingModes.USER.toLowerCase(), document.createElement("canvas"));
//        cam.facingMode = FacingModes.USER.toLowerCase();
        cam.start(true);
        return () => {
            cam.stop();
            cam = null;
        };
    }, []);
    //
    useImperativeHandle(ref, () => {
        return {
            capture() {
//                draw();
//                stop();
//                return canvas.toDataURL("image/jpeg");
                return cam.snap("'image/jpeg'");
            },
            switch() {
//                return switchCamera();
                cam.flip();
                return cam.start();
            },
            resume() {
//                return resumeCamera();
                return cam.start(true);
            }
        };
    });

    return <video className={cx(props.className, 'object-cover transform-gpu')}
                  ref={r => webcam.current = r!}
                  autoPlay={true}
                  playsInline={true}
                  disablePictureInPicture={true}
                  muted={true}
                  width={window.innerWidth}
                  height={window.innerHeight}
    />;
});
