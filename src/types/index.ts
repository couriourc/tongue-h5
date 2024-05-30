import _ from "underscore";

export type ExtraFunctionParameters<T> = T extends ((...args: any) => any)
    ? Parameters<T> : T;

export type FunctionOrValue<T, U = ExtraFunctionParameters<T>> = T | ((...args: U[]) => T)

export type DynamicProps<T> = T & Record<string, any>;

export type WithMessageProps<T> = T & Partial<{
    success_message: FunctionOrValue<string>;
    error_message: FunctionOrValue<string>;
}>
