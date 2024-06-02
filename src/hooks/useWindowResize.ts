import {useEffect} from "react";

export function useWindowResize(fn: Function) {
    useEffect(() => {
        const listen = (ev: UIEvent) => fn(ev);
        window.addEventListener("resize", listen);
        return () => window.removeEventListener("resize", listen);
    }, []);
}
