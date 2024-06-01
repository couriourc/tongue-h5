type MediaDeviceKind = 'video' | 'audio';

/**
 * getAvailableDevices
 * Returns a list of available hardware audio and or video devices.
 *
 * @param {string} type Either 'video' or 'audio'. If not specified, all
 * devices will be returned.
 */
export const getAvailableDevices = async (type: MediaDeviceKind = 'video') => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices?.filter(() => {
        if (type === 'video') {
            return devices.filter(d => d.kind === 'videoinput');
        }
        if (type === 'audio') {
            return devices.filter(d => d.kind === 'audioinput');
        }
    });
};

export const buildConstraints = (facingMode: MediaTrackConstraintSet["facingMode"] = "user", height: number, width: number) => {
    const constraints: MediaStreamConstraints = {video: {}};
    /*@ts-ignore*/
    if (facingMode) constraints.video.facingMode = facingMode.toLowerCase();
    /*@ts-ignore*/
    if (height) constraints.video.height = {ideal: height};
    /*@ts-ignore*/
    if (width) constraints.video.width = {ideal: width};
    return constraints;
};
export const FacingModes = {
    ENVIRONMENT: 'ENVIRONMENT',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    USER: 'USER',
} as const;

export const errorTypes = {
    INVALID_FACING_MODE: {
        details: 'Facing mode not recognized',
        type: 'INVALID_FACING_MODE',
    },
    NO_STREAM: {
        details: 'Your browser does not support this feature',
        type: 'NO_STREAM',
    },
    TAKE_PHOTO_FAILURE: {
        details: 'Could not take a photo',
        type: 'TAKE_PHOTO_FAILURE',
    },
    UNSUPPORTED: {
        details: 'Your browser does not support this feature',
        type: 'UNSUPPORTED',
    },
} as const;
