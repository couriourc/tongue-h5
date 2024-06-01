export type FunctionOrValue<T> = (() => T) | T;


export type TableDataResultWithTotal<T> = {
    total: number;
} & T;
export type TableDataResult<T> = TableDataResultWithTotal<{
    items: T[]
}>

export type DynamicProps<T> = T & Record<string, any>;

export type WithMessageProps<T> = T & Partial<{
    success_message: FunctionOrValue<string>;
    error_message: FunctionOrValue<string>;
}>

export type WithClassName<T> = T & {
    className?: string;
};
