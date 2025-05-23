import axios from "axios";

// Base URL from environment
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // always send cookies
});

// ---- Auth Helpers ----
function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
}

// ---- Request Interceptor: attach the token ----
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

// ---- Refresh Logic State ----
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

// ---- Response Interceptor: handle 401s ----
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response, config: originalRequest } = error;

        // If 401 and not already retried
        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                // Call refresh endpoint
                return api
                    .post("/Authentication/Refresh")
                    .then((res) => {
                        const newToken = res.data.token;
                        setToken(newToken);
                        onRefreshed(newToken);
                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err))
                    .finally(() => {
                        isRefreshing = false;
                    });
            }

            // Queue the request until token is refreshed
            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
