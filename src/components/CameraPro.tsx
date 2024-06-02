import {forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {BiError} from "react-icons/bi";
import {iif} from "@/utils";
import {cx} from "@emotion/css";
import {FacingModes, getAvailableDevices} from "@/utils/camera";
import {useTriggerArray} from "@/hooks/trigger";
import {useWindowResize} from "@/hooks/useWindowResize";


const getListOfVideoInputs = async () => {
    return getAvailableDevices("video");
};

export interface CameraProExposed {
    capture(): string;

    switch(): void;

    resume(): void;
}

export interface ICameraProDefault {
    cameraNumber: number;
    className?: string;
    Error?: ReactNode;
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}


const isSupported = hasGetUserMedia();
const initializeMedia = () => {
    if (!isSupported) return;
    if (!("mediaDevices" in navigator)) {
        /* @ts-ignore */
        navigator.mediaDevices! = {} as {
            getUserMedia(): Promise<any>
        };
    }
};
initializeMedia();

export const CameraPro = forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
    if (!isSupported) return iif(!!props.Error, <>{Error}</>,
        <div size-full flex flex-center text-32px
             text-danger bg-black font-fold>
            <BiError/>
            没有相机权限
        </div>);

    const video = useRef<HTMLVideoElement>();
    const [cameraNumber, setCameraNumber] = useState<number>(1);


    const {cur, next} = useTriggerArray([
        FacingModes.USER,
        FacingModes.ENVIRONMENT,
    ]);

    const tryCapture = async () => {
        let $video = video.current!;
        //Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();
        //The device has a camera
        if (videoInputs.length) {
            navigator.mediaDevices
                ?.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: cur.toLowerCase(),
//                        height:
                        width: {
                            min: window.innerWidth,
                            ideal: 1920,
                            max: 2080,
                        },
                        height: {
                            min: window.innerHeight,
                            ideal: 1080,
                            max: 1440,
                        },
                    },
                })
                .then((stream) => {
                    $video.srcObject = stream;
                    $video.onloadedmetadata = () => {
                        $video.play();
                    };
                    $video.onpause = () => {
                        stream.getTracks().forEach((track) => {
                            track.stop();
                        });
                    };
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("The device does not have a camera");
        }
    };

    const stop = () => {
        let $video = video.current;
        $video?.pause();
    };
    const canvas = useMemo(() => document.createElement("canvas"), []);

    const resumeCamera = () => {
        let $video = video.current;
        return $video?.play();
    };


    useWindowResize(() => {
        return tryCapture();
    });

    useImperativeHandle(ref, () => {
        return {
            capture() {
                draw();
                stop();
                return canvas.toDataURL("image/jpeg");
            },
            switch() {
                return switchCamera();
            },
            resume() {
                return resumeCamera();
            }
        };
    });


    const switchCamera = async () => {
        const listOfVideoInputs = await getListOfVideoInputs();
        let $video = video.current!;
        // The device has more than one camera
        if (listOfVideoInputs.length > 1) {
            next();
            console.log(cur);
            /*toNext*/
            if ($video.srcObject) {
                stop();
                clean();
            }
            await tryCapture();
        } else if (listOfVideoInputs.length === 1) {
//            alert("The device has only one camera");
        } else {
//            alert("The device does not have a camera");
        }
    };

    const clean = () => {
        const context = canvas.getContext("2d")!;
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    function draw() {
        let $video = video.current!;
        if (!$video) return;
        const context = canvas.getContext("2d")!;
        clean();

        context.drawImage($video, 0, 0, canvas.width, canvas.height);

    }

    useEffect(() => {
        let $video = video.current!;
        if (!$video) return;
        tryCapture().then(() => {
        });
    }, []);

    return <>
        <div className={cx('relative')}>
            <video className={cx(props.className, 'w-screen! h-screen! object-cover')}
                   autoPlay
                   disablePictureInPicture={true}
                   muted={true}
                   playsInline
                   ref={r => video.current = r!}
            />
        </div>
    </>;
});
