import {createRootRoute, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import {WithNprogress} from "@/components/WithProgress";

export const Route = createRootRoute({
    component: () => (
        <>
            <WithNprogress>
                <Outlet/>
            </WithNprogress>
        </>
    ),
});
