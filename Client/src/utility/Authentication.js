export const login = async (obj) => {
    const response = await fetch(
        "http://localhost:5196/Authentication/SignIn",
        {
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
        }
    );

    const responseData = await response.json();
    console.log(responseData.token);

    localStorage.setItem("jwtToken", responseData.token);
    //returns if the status is 200 or 401
    const isAuthenticated = response.status == 200;
    return isAuthenticated;
};

export const register = async (obj) => {
    const response = await fetch("http://localhost:5196/Identity/register", {
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
    await fetch("http://localhost:5196/Logout", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    localStorage.removeItem("jwtToken");
};
