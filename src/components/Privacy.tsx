import {cx} from "@emotion/css";
import {Checkbox, Dialog, Typography} from "react-vant";
import {atom, useAtom} from "jotai";
import {useCallback} from "react";

const isShowPrivacy = atom<boolean>(false);

// eslint-disable-next-line react-refresh/only-export-components
export const usePrivacy = () => useAtom(isShowPrivacy);

export function ReadPrivacy() {
    const [isShow, setIsShow] = usePrivacy();
    const open = useCallback(() => setIsShow(true), []);
    const close = useCallback(() => setIsShow(false), []);
    return <>
        <Dialog
            title={'隐私政策'}
            visible={isShow}
            closeOnClickOverlay={true}
            showCancelButton
            onCancel={() => close()}
            onConfirm={() => close()}
        >
            <div flex justify-center p-32px>
                <Typography.Text>
                    <Typography.Text className={'indent-2em'}>
                        请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于:为了向你提供即时通讯、内容分享等服务我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置“中查看、变更、制除个人信息并管理你的授权。
                    </Typography.Text>
                    <Typography.Text className={'indent-2em'}>
                        你可阅读
                        <Typography.Text type="warning" className={'indent-0'}>《隐私政策》</Typography.Text>了解详细信息。如你同意，请点击“同意“开始接受我们的服务。
                    </Typography.Text>
                </Typography.Text>
            </div>
        </Dialog>
        <div className={cx('gap-12px flex w-fit ')}>
            <Checkbox shape="square"></Checkbox>
            <Typography.Text>
                已阅读并同意<Typography.Text type="warning"
                                             onClick={() => open()}>《隐私政策》</Typography.Text></Typography.Text>
        </div>
    </>;
}
