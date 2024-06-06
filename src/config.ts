import _ from "underscore";
export const getConfigFromGlobal = <T extends keyof IGlobalConfiguration>(key: T, placeholder: IGlobalConfiguration[T]): IGlobalConfiguration[T] => {
    return (_.get(window, key) ?? placeholder) as unknown as IGlobalConfiguration[T];
};
