import {FunctionOrValue, ExtraFunctionParameters} from "@/types";
import _ from "underscore";

export function iif<T, U>(condition: boolean, whenTrue: T, whenFalse: U) {
    return condition ? whenTrue : whenFalse;
}

export function extraFunction<T>(
    fnOrVal: FunctionOrValue<T>,
) {
    if (_.isFunction(fnOrVal)) {
        return (...args: ExtraFunctionParameters<typeof fnOrVal>) => fnOrVal(...args);
    }
    return () => fnOrVal;
}
