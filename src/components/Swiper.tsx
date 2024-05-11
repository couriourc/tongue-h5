import { Swiper as VantSwiper, Image, Skeleton } from 'react-vant';
import { PropsWithChildren } from "react";

export const Swiper = ({ images }: PropsWithChildren<{ images: string[] }> = { images: [] }) => {
    return (
        <div>
            <VantSwiper>
                {images.map((image) => (
                    <VantSwiper.Item key={image}>
                        <Image src={image} />
                    </VantSwiper.Item>
                ))}
            </VantSwiper>
        </div>
    );
};
