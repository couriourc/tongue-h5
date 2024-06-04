import {PropsWithChildren, useEffect, useRef, useState} from "react";
import _ from "underscore";

export function WithTypeWrite({children}: PropsWithChildren) {
    const [cur, setCur] = useState("");
    const [cur_last, setCurLast] = useState("@");
    const count = useRef(0);
    const hasd = useRef(0);


    const random = "!@#$%^&*()";
    useEffect(() => {
        if (!_.isString(children)) return;
        if (hasd.current >= children.length) return;
        const timeout = setInterval(() => {
            if (hasd.current >= children.length) {
                setCurLast(() => "");
                setCur(() => children);
                return clearInterval(timeout);
            }
            if (count.current <= 3) {
                count.current++;
                setCurLast(() => random[~~_.random(random.length - 1)]);
            } else {
                count.current = 0;
                hasd.current++;
                setCur(() => children.slice(0, hasd.current));
            }
        }, 100);

        return () => clearInterval(timeout);
    }, [count, hasd]);

    return <>{cur + cur_last}</>;
}
