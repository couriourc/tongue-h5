import {Swiper as VantSwiper, Image} from 'react-vant';
import {PropsWithChildren} from "react";

export const Swiper = ({images}: PropsWithChildren<{ images: string[] }> = {images: []}) => {
    return (
        <div className="demo-swiper">
            <VantSwiper>
                {images.map((image) => (
                    <VantSwiper.Item key={image}>
                        <Image lazyload src={image}/>
                    </VantSwiper.Item>
                ))}
            </VantSwiper>
        </div>
    );
};
