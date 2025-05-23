import api from "./axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// helper to read token on each call
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

    const data = response.data;
    data.ok = response.status >= 200 && response.status < 300;
    data.status = response.status;
    return data;
};

export const deleteEntity = async (id) => {
    const response = await api.delete(`${baseUrl}/Entites/DeleteEntity/${id}`, {
        headers: {
            Accept: "application/json",
            ...getAuthHeader(),
        },
    });

    const data = response.data;
    data.ok = response.status >= 200 && response.status < 300;
    data.status = response.status;
    return data;
};

export const editEntity = async (newObj) => {
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

    const data = response.data;
    data.ok = response.status >= 200 && response.status < 300;
    data.status = response.status;
    return data;
};
