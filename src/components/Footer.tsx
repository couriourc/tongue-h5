import {getConfigFromGlobal} from "@/config";
import {cx} from "@emotion/css";
import {memo} from "react";

export const Copyright = memo(
    () => {
        const info = getConfigFromGlobal("beian", "备案号：蜀ICP备2024044876号");
        const copyright = getConfigFromGlobal("copyright", "©版权所有：四川汉方甄选科技有限公司");
        return <footer className={cx(" bottom-0 right-0 text-black text-center")}>
            <a className={cx("beian text-black")} href="https://beian.miit.gov.cn/#/Integrated/index"
               target="_blank">
                <div>{info}</div>
                <div className={cx("flex items-center justify-center")}>
                    <span>{copyright}</span>
                </div>
            </a>
        </footer>;
    }
);
