import {FunctionOrValue} from "@/types";
import _ from "underscore";

export function iif<T, U>(condition: boolean, whenTrue: T, whenFalse?: U) {
    return condition ? whenTrue : whenFalse;
}

// 将 base64 转换为 Blob
function base64ToBlob(base64: string): [Blob, string] {
    var arr = base64.split(","),
        mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return [new Blob([u8arr], {
        type: mime,
    }), mime];
}

export function base64ToFile(base64: string, fileName = '' + Date.now()) {
    const [blob, mime] = base64ToBlob(base64);
    console.log();
    return new File([blob], `${fileName}.${mime.split("/").pop()}`, {type: mime as string});
}

export function fileToBase64(file: File) {

    let reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            if (!reader.result) {
                reject("parser error");
            }
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    });

}

export function placeholder<T>(text: T, defaultText: T) {
    return iif(!!text, text, defaultText);
}

export function extraFunction<T>(fnOrValue: FunctionOrValue<T>, ...args: any[]) {
    return (iif(_.isFunction(fnOrValue), fnOrValue, () => {
    }) as Function)(...args);
}
