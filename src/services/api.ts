import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.18.5:3333"
});

api.interceptors.response.use(response => response, requestError => {
    console.log(requestError)
    if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
    } else {
        return Promise.reject(requestError);
    }
});

export {
    api
};