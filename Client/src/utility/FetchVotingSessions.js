import { toast } from "sonner";
import api from "./axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
    });
    return response.data;
};

export const createVotingSession = async (obj) => {
    try {
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
            }
        );
        return { isSuccessful: true, message: response.data.message };
    } catch (error) {
        toast.error(error.response.data.errors.Title);
        return { isSuccessful: false };
    }
};

export const deleteVotingSession = async (id) => {
    try {
        const response = await api.delete(
            `${baseUrl}/VotingSessions/DeleteVotingSession/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    ...getAuthHeader(),
                },
            }
        );
        console.log(response);

        return { isSuccessful: true, message: response.data.message };
    } catch (error) {
        toast.error(error.response.data.title);

        return { isSuccessful: false };
    }
};
