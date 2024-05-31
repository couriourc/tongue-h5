import {forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import {useSupported} from "@reactuses/core";

const getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
};

export interface CameraProExposed {
    capture(): string;

    switch(): void;

    resume(): void;
}

export interface ICameraProDefault {
    cameraNumber: number;
}

export const CameraPro = forwardRef((props: Partial<ICameraProDefault>, ref: Ref<CameraProExposed>) => {
    const video = useRef<HTMLVideoElement>();
    let cameraNumber = props.cameraNumber || 1;
    const isSupported = useSupported(() => {
        /* @ts-ignore */
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia
            /* @ts-ignore */
            || navigator.mediaDevices.webkitGetUserMedia
            /* @ts-ignore */
            || navigator.mediaDevices.mozGetUserMedia
            /* @ts-ignore */
            || navigator.mediaDevices.msGetUserMedia
            /* @ts-ignore */
            || navigator.webkitGetUserMedia
            /* @ts-ignore */
            || navigator.mozGetUserMedia
            /* @ts-ignore */
            || navigator.msGetUserMedia;
        return !!navigator.mediaDevices.getUserMedia;
    });

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
        console.log(cameraNumber, videoInputs[cameraNumber % videoInputs.length].deviceId, videoInputs);
        console.log(
            $video.clientHeight,
            $video.clientWidth
        );
        if (videoInputs.length) {
            navigator.mediaDevices
                ?.getUserMedia({
                    video: {
                        deviceId: {
                            exact: videoInputs[cameraNumber % videoInputs.length].deviceId,
                        },
                        height: $video.clientHeight,
                        width: $video.clientWidth,
                    },
                })
                .then((stream) => {

                    $video.srcObject = stream;
                    $video.play();
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
        $video?.play();
    };

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
            if ($video.srcObject) {
                stop();
                clean();
            }
            // switch to first camera
            cameraNumber = (cameraNumber + 1) % listOfVideoInputs.length;
            // Restart based on camera input
            tryCapture();
        } else if (listOfVideoInputs.length === 1) {
            alert("The device has only one camera");
        } else {
            alert("The device does not have a camera");
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
        if (!isSupported) return;
        let $video = video.current!;
        if (!$video) return;
        tryCapture();
    }, [isSupported]);

    return <>
        {
            isSupported ?
                <video className="size-screen"
                       ref={r => video.current = r!}
                /> :
                <div size-full flex flex-center text-32px text-danger>没有相机权限</div>
        }
    </>;
});
