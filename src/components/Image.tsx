import {cx} from "@emotion/css";
import {PropsWithChildren} from "react";
import {Image as VantImage, type ImageProps} from "react-vant";

export declare type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

const Images = {
    "arrow": await import("@/assets/arrow.png?url"),
    "gallary_add": await import("@/assets/gallary_add.png?url"),
    "switch-camera": await import("@/assets/switch-camera.png?url"),
    "face": await import("@/assets/face.png?url")
} as const;
type PresetImageName = keyof typeof Images;

export interface WithPresetImageProps {
    src?: PresetImageName | string;
}

export const Image = (props: PropsWithChildren<ImageProps & WithPresetImageProps>) => {
    let src = Images[props.src as PresetImageName]?.default || props.src;
    return <div className={cx(props.className)}>
        <VantImage {...{...props, src}} alt={props.alt ?? "alt"}></VantImage>
    </div>;
};
