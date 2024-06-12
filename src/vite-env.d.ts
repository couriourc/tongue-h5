/// <reference types="vite/client" />

interface IGlobalConfiguration {
    baseURL: string;
    loadingDuration: number;
}

declare interface Window {
    config: IGlobalConfiguration;
}
