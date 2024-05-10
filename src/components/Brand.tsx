import Logo from "@/assets/logo.png";
import {cx} from "@emotion/css";
import {PropsWithChildren} from "react";

export function BrandWithName(props: PropsWithChildren<{ className?: string }>) {
    return <div className={cx('flex items-center  gap-16px w-200px text-36px', props.className)}>
        <img className={cx('w-50px')} src={Logo} alt={'logo'}/> <span>xxx</span>
    </div>;
}
