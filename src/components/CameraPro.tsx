import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
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

    const canvas = useMemo(() => document.createElement("canvas"), [])
    useImperativeHandle(ref, () => {
        return {
            capture() {
                draw();
                return canvas.toDataURL("image/png");
            }
        }
    });

    function draw() {
        let $video = video.current!;
        if (!$video) return;
        const context = canvas.getContext("2d")!;

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage($video, 0, 0, $video.clientWidth, $video.clientHeight);

    }

    useEffect(() => {
        let $video = video.current!;
        if (!$video) return;
        navigator.mediaDevices?.getUserMedia({
            video: true,
            audio: false
        }).then((stream) => {
            $video.srcObject = stream;
            $video?.play()
        }).catch(err => {
            alert(err)
        })

        const onPlay = () => {
            canvas.width = $video.clientWidth, $video.clientWidth;
            canvas.height = $video.clientWidth, $video.clientHeight;

            draw();
        }
        video.current?.addEventListener("play", onPlay)

        return $video.removeEventListener("play", onPlay)
    }, [video.current])

    return <>
        {
            isSupported ?
                <video className="w-full h-full" autoPlay muted src={PreviewVideo} ref={r => video.current = r!} /> :
                <div size-full flex flex-center text-32px text-danger>没有相机权限</div>
        }
    </>
})