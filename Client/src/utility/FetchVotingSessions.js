// src/api/sessions.js
import api from "./axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Helper to get fresh token each time
function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAllSessions = async () => {
    const response = await api.get(`${baseUrl}/VotingSessions/GetAllSessions`, {
        headers: {
            Accept: "application/json",
            ...getAuthHeader(),
        },
        withCredentials: true, // if you need cookies
    });
    return response.data;
};

export const createVotingSession = async (obj) => {
    const response = await api.post(
        `${baseUrl}/VotingSessions/CreateVotingSession`,
        {
            title: obj.title,
            description: obj.description,
            scheduledUntil: obj.scheduledUntil,
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            withCredentials: true,
        }
    );

    // mirror your shape: attach ok/status
    const data = response.data;
    data.ok = response.status >= 200 && response.status < 300;
    data.status = response.status;
    return data;
};

export const deleteVotingSession = async (id) => {
    const response = await api.delete(
        `${baseUrl}/VotingSessions/DeleteVotingSession/${id}`,
        {
            headers: {
                Accept: "application/json",
                ...getAuthHeader(),
            },
            withCredentials: true,
        }
    );

    const data = response.data;
    data.ok = response.status >= 200 && response.status < 300;
    data.status = response.status;
    return data;
};
