import {FileRoutesByPath, useNavigate} from "@tanstack/react-router";

export function useTo() {
    const navigate = useNavigate();
    return (to: keyof FileRoutesByPath, params?: Record<string, any>) => navigate({to, params: params});
}
