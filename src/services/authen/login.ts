import axios from "axios";
import { env } from "../../libs";
import { setAccessToken } from "../../stores/auth-store";

export const login = async (usernameOrEmail: string, password: string) => {
    try {
        const payload: { password: string; email?: string; username?: string } = { password };
        if (usernameOrEmail.includes("@")) {
            payload.email = usernameOrEmail;
        } else {
            payload.username = usernameOrEmail;
        }
        const response  = await axios.post(`${env.be.url}/api/auth/login`, payload, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (response && response.data && response.data.accessToken) {
            setAccessToken(response.data.accessToken);
        } else {
            console.error("Login response did not contain expected accessToken:", response.data);
            throw new Error("Login failed: Invalid response from server.");
        }
    } catch (error) {
        throw error;
    }
};
