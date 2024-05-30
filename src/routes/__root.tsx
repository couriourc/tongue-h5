import {createRootRoute, Outlet} from '@tanstack/react-router';
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
