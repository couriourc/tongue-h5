import {cx} from "@emotion/css";
import {PropsWithChildren, useEffect, useRef} from "react";
import {Image as VantImage, type ImageProps} from "react-vant";
import {publicAssets} from "@/utils";

const gallaryAddUrl = publicAssets("/img/gallary_add.png");
const faceUrl = publicAssets("/img/face.svg");
const scanUrl = publicAssets("/img/scan.png");
const hosUrl = publicAssets("/img/hos.png");
const tongueUrl = publicAssets("/img/tongue.png");
const CameraPng = publicAssets("/img/camera.png");
const logoUrl = publicAssets("/img/logo.png");

export declare type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

const Images = {
    "camera": CameraPng,
    "gallary_add": gallaryAddUrl,
    "face": faceUrl,
    "scan": scanUrl,
    "hos": hosUrl,
    "tongue": tongueUrl,
    "logo": logoUrl
} as const;
type PresetImageName = keyof typeof Images;

export interface WithPresetImageProps {
    src?: PresetImageName | string;
}

export const Image = (props: PropsWithChildren<ImageProps & WithPresetImageProps>) => {
    const img = useRef<HTMLDivElement>();
    let src = Images[props.src as PresetImageName] || props.src;

    useEffect(() => {
        let src = props.src;
        /*@ts-ignore*/
        if (src instanceof window.Image) {
            /*@ts-ignore*/
            src = src.cloneNode();
            /*@ts-ignore*/
            src.className = cx(props.className, 'transform-gpu');
            /*@ts-ignore*/
            src.setAttribute('fit', props.fit);
            /*@ts-ignore*/
            img.current?.append(src.cloneNode());
            /*@ts-ignore*/
        }
        return () => {
            /*@ts-ignore*/
            if (src instanceof window.Image) {
                (src as HTMLImageElement).remove();
            }
        };
    }, []);


    return <div className={cx(props.className, 'transform-gpu')} ref={(r) => img.current = r!}>

        {
            // @ts-ignore
            !(props.src instanceof window.Image) && <VantImage {...{...props, src}} alt={props.alt ?? "alt"}/>
        }
    </div>;
};
