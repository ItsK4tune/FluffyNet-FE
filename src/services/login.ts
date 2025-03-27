import axios from "axios";

export const login = async (password: string, username?: string, email?: string) => {
    try {
        const response = await axios.post("http://58.186.92.88/api/auth/login", {
            username,
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error; 
    }
};