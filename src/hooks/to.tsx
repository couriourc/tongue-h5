import {FileRoutesByPath, useNavigate} from "@tanstack/react-router";

export function useNavigateTo() {
    const navigate = useNavigate();
    return (to: keyof FileRoutesByPath) => navigate({to});
}
