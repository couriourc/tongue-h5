import {FunctionOrValue} from "@/types";
import _ from "underscore";

export function iif<T, U>(condition: boolean, whenTrue: T, whenFalse: U) {
    return condition ? whenTrue : whenFalse;
}

export function base64ToFile(base64: string, fileName = '' + Date.now()) {
    let arr = base64.split(",");
    if (!arr.length) return;
    let mime = /:(.*?);/.exec(arr[0])![1];
    if (!mime) return;
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type: "image/jpeg"});
}

export function placeholder<T>(text: T, defaultText: T) {
    return iif(!!text, text, defaultText);
}

export function extraFunction<T>(fnOrValue: FunctionOrValue<T>, ...args: any[]) {
    return (iif(_.isFunction(fnOrValue), fnOrValue, () => {
    }) as Function)(...args);
}
