// Import the generated route tree
import {routeTree} from './routeTree.gen';
import {createRouter, RouterProvider} from "@tanstack/react-router";
import React from "react";
import {ConfigProvider} from "react-vant";
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
        <RouterProvider router={router}/>
    </ConfigProvider>;
}
