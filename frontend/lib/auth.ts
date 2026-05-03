export const getLoggedInUser = () => {
    if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("whisper_user");
        return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem("whisper_user");
    window.location.href = "/login";
};