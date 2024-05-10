import { PropsWithChildren } from "react";

export function AlertTip({ children }: PropsWithChildren) {

    return <div
        className={`
    flex-center
     w-full py-23px rounded-16px
    text-center text-primary  text-32px bg-#E2AF6E1A 
     `}>
        {children}
    </div>
}