import {cx} from "@emotion/css";
import {PropsWithChildren} from "react";
import {Image as VantImage, type ImageProps} from "react-vant";

import ArrowPngUrl from "@/assets/arrow.png?url";
import Gallary_addPngUrl from "@/assets/gallary_add.png?url";
import SwitchCameraPngUrl from "@/assets/switch-camera.png?url";
import FacePngUrl from "@/assets/face.png?url";

export declare type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';


const Images = {
    "arrow": ArrowPngUrl,
    "gallary_add": Gallary_addPngUrl,
    "switch-camera": SwitchCameraPngUrl,
    "face": FacePngUrl
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
