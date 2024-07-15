import {Button, Overlay} from 'react-vant';
import {forwardRef, useImperativeHandle} from "react";
import {useTrigger} from "@/hooks/trigger";
import {Image} from "@/components/Image";
import {Cross} from "@react-vant/icons";

export type TurtorialRef = ReturnType<typeof useTrigger>

export const Turtorial = forwardRef<TurtorialRef>((_props, ref) => {
    const {state, open, close, ...other} = useTrigger(false);
    useImperativeHandle(ref, () => {
        return {
            state,
            open,
            close,
            ...other,
        };
    });
    console.log(state);
    return <Overlay visible={state} onClick={() => close()}>
        <div className={'w-screen  h-screen flex flex-col justify-center items-center  h-328px '}>
            <div className={'w-full h-80vh overflow-y-auto m-auto'}>
                <div onClick={()=>close()} className={"absolute size-64px border-solid border-1px border-white text-white  text-42px flex flex-center bottom-64px translate-x--50% rounded-full left-50%"}>
                    <Cross />
                </div>
                <Image className={'w-90% m-auto'} src={"/img/tutorial.jpg"}></Image>
            </div>
        </div>
    </Overlay>;
});
