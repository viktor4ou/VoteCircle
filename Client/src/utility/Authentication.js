const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const login = async (obj) => {
    const response = await fetch(`${baseUrl}/Authentication/SignIn`, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: obj.email,
            password: obj.password,
        }),
    });

    const responseData = await response.json();
    console.log(responseData.token);

    localStorage.setItem("jwtToken", responseData.token);
    //returns if the status is 200 or 401
    const isAuthenticated = response.status == 200;
    return isAuthenticated;
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
