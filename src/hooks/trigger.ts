import {useMemo, useRef, useState} from "react";
import _ from "underscore";

export function useTrigger<T extends any>(queue?: boolean, memo?: T) {
    const [state, setState] = useState(!!queue);
    const _memo = useRef<T>(memo!);
    return {
        state,
        memo: _memo,
        remember(memo: T) {
            _memo.current = memo;
        },
        open(memo?: T) {
            if (!_.isUndefined(memo)) {
                _memo.current = memo;
            }
            setState(() => true);
        },
        close() {
            setState(() => false);
        },
    };
}

export function useTriggerArray<T extends Array<any>>(queue: T) {
    const [cur, setCur] = useState(0);

    const length = queue.length;

    const cachedValue = useMemo(() => {
        return queue[(cur + length) % length];
    }, [cur]);

    return {
        prev() {
            setCur((cur) => cur - 1);
        },
        next() {
            setCur((cur) => cur + 1);
        },
        set(cur: number) {
            setCur(cur);
        },
        cur: cachedValue
    };

}
