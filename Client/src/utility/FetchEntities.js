import { toast } from "sonner";
import api from "./axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAllEntitesBySessionId = async (id) => {
    const response = await api.get(
        `${baseUrl}/Entites/GetAllEntitesBySessionId`,
        {
            params: { sessionId: id },
            headers: {
                ...getAuthHeader(),
            },
        }
    );
    return response.data;
};

export const createEntity = async (formValues) => {
    try {
        const response = await api.post(
            `${baseUrl}/Entites/CreateEntity`,
            {
                title: formValues.title,
                percentageWeight: formValues.percentageWeight,
                sessionId: formValues.sessionId,
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
        if (error.response.data.errors.Title) {
            toast.error(error.response.data.errors.Title);
        }
        if (error.response.data.errors.PercentageWeight) {
            toast.error(error.response.data.errors.PercentageWeight);
        }
        return { isSuccessful: false };
    }
};

export const deleteEntity = async (id) => {
    try {
        const response = await api.delete(
            `${baseUrl}/Entites/DeleteEntity/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    ...getAuthHeader(),
                },
            }
        );
        return { isSuccessful: true, message: response.data.message };
    } catch (error) {
        toast.error(error.response.data.title);
        return { isSuccessful: false };
    }
};

export const editEntity = async (newObj) => {
    try {
        const response = await api.patch(
            `${baseUrl}/Entites/EditEntity`,
            {
                id: newObj.id,
                title: newObj.title,
                percentageWeight: newObj.percentageWeight,
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
        if (error.response.data.errors.Title) {
            toast.error(error.response.data.errors.Title);
        }
        if (error.response.data.errors.PercentageWeight) {
            toast.error(error.response.data.errors.PercentageWeight);
        }
        return { isSuccessful: false };
    }
};
