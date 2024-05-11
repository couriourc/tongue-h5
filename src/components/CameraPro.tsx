import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import PreviewVideo from "@/assets/video.mp4?url"
import { useSupported } from "@reactuses/core";

const getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
};

export const CameraPro = forwardRef((props, ref: Ref<{
    capture(): void;
}>) => {
    const video = useRef<HTMLVideoElement>();
    let cameraNumber = 1;
    const isSupported = useSupported(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return !!navigator.getUserMedia
    });

    const initializeMedia = async () => {
        if (!isSupported) return;
        console.log(isSupported)

        if (!("mediaDevices" in navigator)) {
            /* @ts-ignore */
            navigator.mediaDevices = {} as {
                getUserMedia(): Promise<any>
            };
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            /* @ts-ignore */
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia =
                    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

    }


    useCallback(initializeMedia, [])();

    const tryCapture = async () => {
        let $video = video.current!;
        //Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();
        //The device has a camera
        if (videoInputs.length) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        deviceId: {
                            exact: videoInputs[cameraNumber].deviceId,
                        },
                        height: $video.clientHeight,
                        width: $video.clientWidth,
                    },
                })
                .then((stream) => {
                    $video.srcObject = stream;
                    $video.play()


                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("The device does not have a camera");
        }
    }

    const stop = async () => {
        let $video = video.current!;
        $video.pause()
    }
    const canvas = useMemo(() => document.createElement("canvas"), [])


    useImperativeHandle(ref, () => {
        return {
            capture() {
                draw();
                stop();
                return canvas.toDataURL("image/png");
            },
            switch() {
                return switchCamera();
            }
        }
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
    }
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
    }, [isSupported])

    return <>
        {
            isSupported ?
                <video className="w-full h-full"
                    ref={r => video.current = r!}
                /> :
                <div size-full flex flex-center text-32px text-danger>没有相机权限</div>
        }
    </>
})