import axios from "axios";
import { env } from "../../libs";

export const register = async (username: string, password: string) => {
    try {
        const payload: { username: string, password: string; } = { username, password };

        await axios.post(`${env.be.url}/api/auth/register`, payload, {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        throw error;
    }
};
