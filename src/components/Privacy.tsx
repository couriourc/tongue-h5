import {cx} from "@emotion/css";
import {Checkbox} from "react-vant";

export function ReadPrivacy() {

    return <div className={cx('gap-12px flex w-fit')}>
        <Checkbox shape="square"></Checkbox>
        <tspan>已阅读并同意<span text-primary>《隐私政策》</span></tspan>
    </div>;
}
