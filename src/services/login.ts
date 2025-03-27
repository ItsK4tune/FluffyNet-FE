import axios from "axios";

export const login = async (usernameOrEmail: string, password: string) => {
    try {
        const payload: { password: string; email?: string; username?: string } = { password };

        if (usernameOrEmail.includes("@")) {
            payload.email = usernameOrEmail;
        } else {
            payload.username = usernameOrEmail;
        }

        const response = await axios.post("http://58.186.92.88/api/auth/login", payload, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
