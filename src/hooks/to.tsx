import {FileRoutesByPath, useNavigate} from "@tanstack/react-router";

export function useTo() {
    const navigate = useNavigate();
    return (to: keyof FileRoutesByPath) => navigate({to});
}
