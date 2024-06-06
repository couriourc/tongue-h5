/// <reference types="vite/client" />

interface IGlobalConfiguration {
    baseURL: string;
}
declare interface Window {
    config: IGlobalConfiguration;
}