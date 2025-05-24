import axios from "axios";

import { toast } from "sonner";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // always send cookies
});

function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
}

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

// Refresh Logic State
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

// Response Interceptor: handle 401s
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response, config: originalRequest } = error;

        // 1) If it's a 401 on the refresh endpoint itself → fire unauthorized
        if (
            response?.status === 401 &&
            originalRequest.url?.endsWith("/Authentication/Refresh")
        ) {
            toast.error(error.response.data);
            return Promise.reject(error);
        }

        // 2) If it's a 401 and we haven't tried a refresh yet
        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                return api
                    .post("/Authentication/Refresh")
                    .then((res) => {
                        const newToken = res.data.token;
                        setToken(newToken);
                        onRefreshed(newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        // if refresh fails for any reason (including 401), fire unauthorized
                        if (err.response?.status === 401) {
                            window.dispatchEvent(new Event("unauthorized"));
                            toast.error("Unauthorized, please sign in!");
                        }
                        return Promise.reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            }

            // queue up other requests until refresh is done
            return new Promise((resolve) =>
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(api(originalRequest));
                })
            );
        }

        // 3) If it's a 401 *after* we already retried once (i.e. refresh gave us a token but the retry still 401)
        if (response?.status === 401 && originalRequest._retry) {
            window.dispatchEvent(new Event("unauthorized"));
        }

        return Promise.reject(error);
    }
);

export default api;
