const token = localStorage.getItem("jwtToken");
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAllSessions = async () => {
    const response = await fetch(`${baseUrl}/VotingSessions/GetAllSessions`);
    const data = await response.json();

    return data;
};

export const createVotingSession = async (obj) => {
    console.log(token);

    const response = await fetch(
        `${baseUrl}/VotingSessions/CreateVotingSession`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
                title: obj.title,
                description: obj.description,
                scheduledUntil: obj.scheduledUntil,
            }),
        }
    );

    const data = await response.json();
    data.ok = response.ok;
    data.status = response.status;

    return data;
};

export const deleteVotingSession = async (id) => {
    const response = await fetch(
        `${baseUrl}/VotingSessions/DeleteVotingSession/${id}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        }
    );

    const data = await response.json();

    data.ok = response.ok;
    data.status = response.status;

    return data;
};
