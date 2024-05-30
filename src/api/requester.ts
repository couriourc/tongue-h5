import axios from "axios";

export const requester = axios.create({
    baseURL: "http://43.136.174.122:4399/"
});

