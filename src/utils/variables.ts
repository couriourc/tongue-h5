export const isDev = () =>
    ["netlify"].includes(import.meta.env?.MODE?.toLowerCase());
console.log(isDev());
