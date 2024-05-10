import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import PreviewVideo from "@/assets/video.mp4?url"
import { useSupported } from "@reactuses/core";

export const CameraPro = forwardRef((props, ref: Ref<{
    capture(): void;
}>) => {
    const video = useRef<HTMLVideoElement>();


    const isSupported = useSupported(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        return !!navigator.getUserMedia
    });

    useImperativeHandle(ref, () => {
        return {
            capture() {
            }
        }
    });

    useEffect(() => {
        navigator.mediaDevices?.getUserMedia({
            video: true,
            audio: false
        }).then((stream) => {
            video.current!.srcObject = stream;
            video.current?.play()
        }).catch(err => {
            alert(err)
        })
    }, [])

    return <>
        {
            isSupported ?
                <video className="w-full h-full" autoPlay muted src={PreviewVideo} ref={r => video.current = r!} /> :
                <div size-full flex flex-center text-32px text-danger>没有相机权限</div>
        }
    </>
})