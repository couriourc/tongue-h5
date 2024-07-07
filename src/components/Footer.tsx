import {getConfigFromGlobal} from "@/config";
import {cx} from "@emotion/css";
import {memo} from "react";
import {Dialog} from "react-vant";
import {useTrigger} from "@/hooks/trigger";
import useSWR from "swr";
import {getPrivacy} from "@/api/common.api";

export const Copyright = memo(
    () => {
        const info = getConfigFromGlobal("beian", "备案号：蜀ICP备2024044876号");
        const {state: privacyShow, close, open} = useTrigger(false);
        const copyright = getConfigFromGlobal("copyright", "©版权所有：四川汉方甄选科技有限公司");
        const {data} = useSWR('/privacy', () => {
            return getPrivacy();
        });

        return <footer className={cx(" bottom-0 right-0 text-black text-center flex ")}>
            <Dialog onConfirm={() => {
                close();
            }} visible={privacyShow}>
                <div className={'overflow-y-auto max-h-2xl p-2 break-all break-after-all'} dangerouslySetInnerHTML={{
                    __html: data
                }}></div>
            </Dialog>
            <div className={'absolute left-0  px-2'} onClick={() => {
                open();
            }}>隐私政策
            </div>
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
