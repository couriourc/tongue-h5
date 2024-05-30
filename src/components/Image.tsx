import {cx} from "@emotion/css";
import {PropsWithChildren} from "react";
import {Image as VantImage, type ImageProps} from "react-vant";
import arrowUrl from "@/assets/arrow.png?url";
import gallaryAddUrl from "@/assets/gallary_add.png?url";
import switchCameraUrl from "@/assets/switch-camera.png?url";
import faceUrl from "@/assets/face.png?url";
import scanUrl from "@/assets/scan.png?url";
import hosUrl from "@/assets/hos.png?url";
import tongueUrl from "@/assets/tongue.png?url";
import homeUrl from "@/assets/home.png?url";
import maintainUrl from "@/assets/mantine.png?url";
import detailUrl from "@/assets/detail.png?url";

export declare type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

const Images = {
    "arrow": arrowUrl,
    "gallary_add": gallaryAddUrl,
    "switch-camera": switchCameraUrl,
    "face": faceUrl,
    "scan": scanUrl,
    "hos": hosUrl,
    "tongue": tongueUrl,
    "home": homeUrl,
    "maintain": maintainUrl,
    "detail": detailUrl,
} as const;
type PresetImageName = keyof typeof Images;

export interface WithPresetImageProps {
    src?: PresetImageName | string;
}

export const Image = (props: PropsWithChildren<ImageProps & WithPresetImageProps>) => {
    let src = Images[props.src as PresetImageName] || props.src;
    return <div className={cx(props.className)}>
        <VantImage {...{...props, src}} alt={props.alt ?? "alt"}></VantImage>
    </div>;
};
