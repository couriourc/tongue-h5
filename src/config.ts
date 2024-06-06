import _ from "underscore";
export const getConfigFromGlobal = <T extends keyof IGlobalConfiguration>(key: T, placeholder: IGlobalConfiguration[T]): IGlobalConfiguration[T] => {
    console.log(_.get(window.config, key))
    return (_.get(window.config, key) ?? placeholder) as unknown as IGlobalConfiguration[T];
};
