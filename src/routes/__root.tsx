import {createRootRoute, Outlet} from '@tanstack/react-router';
import {WithNprogress} from "@/components/WithProgress";
import NProgress from "nprogress";

export const Route = createRootRoute({
    component: () => (
        <>
            <WithNprogress>
                <Outlet/>
            </WithNprogress>
        </>
    ),
});
