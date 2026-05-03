// lib/api.ts
const backend_URI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const baseApiResponse = (data: any, isSuccess: boolean, message: string = "") => {
    return { success: isSuccess, data: data || null, message: message };
};

// auth user api

export const registerUser = async (input: { username: string, displayName: string, email: string, password: string }) => {
    try {
        const response = await fetch(`${backend_URI}/users/addUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        const result = await response.json();
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        return baseApiResponse(null, false, "Failed to register. Server might be down.");
    }
};

export const loginUser = async (input: { email: string, password: string }) => {
    try {
        const response = await fetch(`${backend_URI}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        const result = await response.json();
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        return baseApiResponse(null, false, "Failed to login. Server might be down.");
    }
};

export const getUserByUsername = async (username: string) => {
    try {
        const response = await fetch(`${backend_URI}/users/username/${username}`, {
            cache: 'no-store' 
        });
        const result = await response.json();
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        return baseApiResponse(null, false, "Failed to fetch user");
    }
};


// whisper api

export const getUserPageWhispers = async (userId: string) => {
    try {
        const response = await fetch(`${backend_URI}/whispers/user/${userId}`, {
            cache: 'no-store' 
        });
        const result = await response.json();
        
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false, "Failed to fetch whispers");
    }
};

export const sendWhisper = async (input: { targetOwnerId: string, content: string, senderName: string }) => {
    try {
        const response = await fetch(`${backend_URI}/whispers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        const result = await response.json();
        
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false, "Failed to send whisper");
    }
};

export const answerWhisper = async (input: { whisperId: string, replyText: string, userId: string }) => {
    try {
        const response = await fetch(`${backend_URI}/whispers/answer`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        const result = await response.json();
        
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false, "Failed to send reply");
    }
};

export const deleteWhisper = async (whisperId: string, userId: string) => {
    try {
        const response = await fetch(`${backend_URI}/whispers`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ whisperId, userId })
        });
        const result = await response.json();
        
        return baseApiResponse(result.data, result.success, result.message);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false, "Failed to delete whisper");
    }
};