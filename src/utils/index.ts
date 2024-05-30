export function iif<T, U>(condition: boolean, whenTrue: T, whenFalse: U) {
    return condition ? whenTrue : whenFalse;
}
