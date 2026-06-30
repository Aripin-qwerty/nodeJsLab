import axios from "axios";
import axiosRetry, { exponentialDelay } from "axios-retry";

import { AppError } from "../utils/AppError.js";

export const httpClient = axios.create({
    timeout: 3000
});

axiosRetry(httpClient, {
    retries: 2,
    retryDelay: exponentialDelay,
    retryCondition: (error) => {
        return (
            error.code === "ECONNABORTED" || // timeout
            error.code === "ECONNRESET" ||
            error.code === "ENOTFOUND" ||
            error.response?.status === 502 ||
            error.response?.status === 503 ||
            error.response?.status === 504
        );
    }

});

httpClient.interceptors.response.use((response) => response, (error) => {
    if (error.code === "ECONNABORTED") {
        console.log(error.toJSON());
        throw new AppError("External service timeout", 504);
    }

    if (error.response) {
        throw new AppError(
            `External service error: ${error.response.data.results.message}`,
            error.response.status
        );
    }

    if (error.request) {
        throw new AppError("External service unreachable", 503);
    }

    throw new AppError("Unknown external service error", 500);
});
