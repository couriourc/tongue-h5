import { cx } from "@emotion/css";
import { Checkbox, Dialog, Typography } from "react-vant";
import { atom, useAtom } from "jotai";
import { useCallback, useState } from "react";

const isShowPrivacy = atom<{
    read: boolean
}>({
    read: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const usePrivacy = () => useAtom(isShowPrivacy);

export function ReadPrivacy() {
    const [privacyStore, setPrivacyStore] = usePrivacy();
    const [isShowPrivacy, setIsShowPrivacy] = useState<boolean>(false);
    const open = useCallback(() => setIsShowPrivacy(true), []);
    const close = useCallback(() => setIsShowPrivacy(false), []);

    return <>
        <Dialog
            title={'隐私政策'}
            visible={isShowPrivacy}
            closeOnClickOverlay={true}
            showCancelButton
            onCancel={() => close()}
            onConfirm={() => {
                setPrivacyStore((state) => {
                    return {
                        ...state,
                        read: true,
                    }
                })
                close()
            }}
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
        <div className={cx('gap-12px flex w-fit ')}
            onClick={() => {
                !privacyStore.read && open()
            }}
        >
            <Checkbox
                checked={privacyStore.read}
                shape="square" />
            <Typography.Text>
                已阅读并同意<Typography.Text type="warning"
                    onClick={() => open()}>《隐私政策》</Typography.Text></Typography.Text>
        </div>
    </>;
}
