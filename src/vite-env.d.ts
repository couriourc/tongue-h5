/// <reference types="vite/client" />

interface IGlobalConfiguration {
    baseURL: string;
    loadingDuration: number;
    loadingStepper: [number, string][];
    loadingDurationToNextStep: number;
}

declare interface Window {
    config: IGlobalConfiguration;
}
