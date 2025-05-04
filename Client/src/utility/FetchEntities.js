const token = localStorage.getItem("jwtToken");

const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const GetAllEntitesBySessionId = async (id) => {
    const response = await fetch(
        `${baseUrl}/Entites/GetAllEntitesBySessionId?sessionId=${id}`,
        {
            method: "GET",
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        }
    );
    const data = await response.json();
    return data;
};
export const createEntity = async (formValues) => {
    const response = await fetch(`${baseUrl}/Entites/CreateEntity`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
            title: formValues.title,
            percentageWeight: formValues.percentageWeight,
            sessionId: formValues.sessionId,
        }),
    });

    const data = await response.json();
    data.ok = response.ok;
    data.status = response.status;

    return data;
};

export const deleteEntity = async (id) => {
    const response = await fetch(`${baseUrl}/Entites/DeleteEntity/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
    const data = await response.json();

    data.ok = response.ok;
    data.status = response.status;

    return data;
};

export const editEntity = async (newObj) => {
    const response = await fetch(`${baseUrl}/Entites/EditEntity`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
            id: newObj.id,
            title: newObj.title,
            percentageWeight: newObj.percentageWeight,
        }),
    });
    const data = await response.json();
    data.ok = response.ok;
    data.status = response.status;
    return data;
};
