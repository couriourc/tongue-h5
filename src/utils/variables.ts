import * as process from "process";

export const isDev = () => process.env.NETLIFY;
