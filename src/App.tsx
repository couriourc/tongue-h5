// Import the generated route tree
import {routeTree} from './routeTree.gen';
import {createRouter, RouterProvider} from "@tanstack/react-router";
import React from "react";
import {ConfigProvider} from "react-vant";
import './i18n';
import {SWRConfig} from "swr";
// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
});
// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}


export function App() {
    return <ConfigProvider>
        <SWRConfig value={{
            errorRetryCount: 0,
            shouldRetryOnError: false,
        }}>
            <RouterProvider router={router}/>
        </SWRConfig>
    </ConfigProvider>;
}
