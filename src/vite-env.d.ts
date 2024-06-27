/// <reference types="vite/client" />

interface IGlobalConfiguration {
    baseURL: string;
    loadingDuration: number;
    loadingStepper: [number, string][];
    loadingDurationToNextStep: number;
    copyright: string;
    beian: string;
}

declare interface Window {
    config: IGlobalConfiguration;
}
