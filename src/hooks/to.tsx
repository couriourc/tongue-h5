import {FileRoutesByPath, useNavigate} from "@tanstack/react-router";

export function useTo() {
    const navigate = useNavigate();
    return (to: keyof FileRoutesByPath, info: {
        params?: Record<string, any>, search?: Record<string, any>
    } = {}) => navigate({to, ...info});
}
