import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const login = async (obj) => {
    const response = await axios.post(
        `${baseUrl}/Authentication/SignIn`,
        JSON.stringify({
            email: obj.email,
            password: obj.password,
        }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );

    const accessToken = response?.data.token;

    console.log("Response data " + response.data);
    console.log("Response token " + accessToken);
    return accessToken;
};

export const register = async (obj) => {
    const response = await fetch(`${baseUrl}/Identity/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: obj.email,
            password: obj.password,
        }),
    });

    const isSuccessful = response.status == 200;
    return isSuccessful;
};

export const logout = async () => {
    await fetch(`${baseUrl}/Logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    localStorage.removeItem("jwtToken");
};
