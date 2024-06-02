export function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export const isSupported = hasGetUserMedia();

const initializeMedia = () => {
    if (!isSupported) return;
    if (!("mediaDevices" in navigator)) {
        /* @ts-ignore */
        navigator.mediaDevices! = {} as {
            getUserMedia(): Promise<any>
        };
    }
};
initializeMedia();
