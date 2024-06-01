import {
    forwardRef,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from "react";
import {BiError} from "react-icons/bi";
import {iif} from "@/utils";
import {cx} from "@emotion/css";
import {getAvailableDevices} from "@/utils/camera";

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

function useWindowResize(fn: Function) {
    useEffect(() => {
        const listen = (ev: UIEvent) => fn(ev);
        window.addEventListener("resize", listen);
        return () => window.removeEventListener("resize", listen);
    }, []);
}

export const CameraPro = forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
    const isSupported = hasGetUserMedia();
    if (!isSupported) return iif(!!props.Error, <>{Error}</>,
        <div size-full flex flex-center text-32px
             text-danger bg-black font-fold>
            <BiError/>
            没有相机权限
        </div>);

    const video = useRef<HTMLVideoElement>();
    const [cameraNumber, setCameraNumber] = useState<number>(1);

    const initializeMedia = async () => {
        if (!isSupported) return;
        if (!("mediaDevices" in navigator)) {
            /* @ts-ignore */
            navigator.mediaDevices! = {} as {
                getUserMedia(): Promise<any>
            };
        }
    };


    useCallback(initializeMedia, [])();

    const tryCapture = async () => {
        let $video = video.current!;
        //Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();
        //The device has a camera
        videoInputs.forEach((videoInput) => {
            console.log(videoInput.toJSON());
        });
        console.log(videoInputs[cameraNumber % videoInputs.length].deviceId, videoInputs);
        console.log(
            $video.clientHeight,
            $video.clientWidth
        );
        if (videoInputs.length) {
            console.log(navigator.mediaDevices.getSupportedConstraints());
            navigator.mediaDevices
                ?.getUserMedia({
                    audio: false,
                    video: {
                        deviceId: {
                            exact: videoInputs[cameraNumber % videoInputs.length].deviceId,
                        },
                        groupId: videoInputs[cameraNumber % videoInputs.length].groupId,
                        height: $video.clientHeight,
                        width: $video.clientWidth,
                        aspectRatio: $video.clientWidth / $video.clientWidth,
                    },
                })
                .then((stream) => {
                    $video.srcObject = stream;
                    $video.onloadedmetadata = () => {
                        $video.play();
                    };
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("The device does not have a camera");
        }
    };

    const stop = async () => {
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
//
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
        let _cameraNumber = (cameraNumber + 1) % listOfVideoInputs.length;

        setCameraNumber(_cameraNumber);
        console.log(_cameraNumber);
        // The device has more than one camera
        if (listOfVideoInputs.length > 1) {
            if ($video.srcObject) {
                stop();
                clean();
            }
            // switch to first camera
//            cameraNumber = (cameraNumber + 1) % listOfVideoInputs.length;
            // Restart based on camera input
            tryCapture();
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
            <video className={cx(props.className)}
                   autoPlay
                   disablePictureInPicture={true}
                   muted={true}
                   playsInline
                   ref={r => video.current = r!}
            />
        </div>
        {/*<Camera className={cx("w-full")} w-full h-full responsive={true}></Camera>*/}
    </>;
});
