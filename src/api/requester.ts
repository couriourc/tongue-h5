import type {AxiosInstance, AxiosResponse} from 'axios';
import axios, {AxiosRequestConfig} from 'axios';
import type {DynamicProps, FunctionOrValue, WithMessageProps} from "@/types";
import {extraFunction} from "@/utils";


interface AxiosRequestType {
    baseURL?: string;
    url?: string | undefined;
    data?: any;
    params?: any;
    method?: string;
    headers: any;
    value?: any;
    cancelToken?: any;
    load?: any;
    noLoad?: boolean;
    need_loading?: boolean;
}

// axios 配置
const request: AxiosInstance = axios.create({
    get baseURL() {
        return "http://43.136.174.122:4399/";
    },
});

request.interceptors.request.use(
    (config: AxiosRequestType) => {
        // 配置token
        if (config.params instanceof FormData || config.data instanceof FormData) {
            config.headers['Content-Type'] = "multipart/form-data";
        }
        // 添加loading
        // 看是否有loadMsg配置，如果存在则进行融合
        // loading是否存在，存在则关闭后在进行loading
        return config;
    },
    (err: any) => {
        return Promise.reject(err);
    }
);

// http response 拦截器 response响应
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        const config = response.config as ExtendedAxiosRequestConfig;
        if (response.status === 200) {

        } else {
            return Promise.reject(response.data);
        }
        let data = response.data;
        if (config.success_message as FunctionOrValue<string>) {
            extraFunction(config.success_message)(response.data);
        }
        return Promise.resolve(data);
    },
    (error: any) => {
        const config = error.response?.config ?? {};
        if (config.error_message) {
            return Promise.reject(extraFunction(config.error_message)(error.response));
        }

        return Promise.reject(error.response);
    }
);

export default function requester<T>(method: string, url: string, data: any = null, config: DynamicProps<Partial<AxiosRequestConfig>> = {}): Promise<T> {
    method = method.toLowerCase();
    let methodFilter = ['post', 'get', 'delete', 'put', 'patch'];
    let paramsFilter = ['get', 'delete'];
    if (methodFilter.includes(method)) {
        let isParams = paramsFilter.includes(method);

        data = isParams
            ? {
                params: data
            }
            : {data};

        return request({
            method,
            url,
            headers: {},
            ...data,
            ...config
        });
    } else {
        console.error('未知的method' + method);
        return Promise.reject('未知的method' + method);
    }
}

type ExtendedAxiosRequestConfig = WithMessageProps<DynamicProps<Partial<AxiosRequestConfig>>>;
requester.get = <T = any>(url: string, params: any = {}, config: ExtendedAxiosRequestConfig = {}) => requester<T>("get", url, params, config);
requester.post = <T = any>(url: string, params: any = {}, config: ExtendedAxiosRequestConfig = {}) => requester<T>("post", url, params, config);
requester.delete = <T = any>(url: string, params: any = {}, config: ExtendedAxiosRequestConfig = {}) => requester<T>("delete", url, params, config);
requester.put = <T = any>(url: string, params: any = {}, config: ExtendedAxiosRequestConfig = {}) => requester<T>("put", url, params, config);
requester.patch = <T = any>(url: string, params: any = {}, config: ExtendedAxiosRequestConfig = {}) => requester<T>("patch", url, params, config);

