import axios from "axios";
import { env } from "../libs";

export const login = async (usernameOrEmail: string, password: string) => {
    try {
        const payload: { password: string; email?: string; username?: string } = { password };

        if (usernameOrEmail.includes("@")) {
            payload.email = usernameOrEmail;
        } else {
            payload.username = usernameOrEmail;
        }

        const data = await axios.post(`${env.be.url}/api/auth/login`, payload, {
            headers: { "Content-Type": "application/json" }
        });

        return data;
    } catch (error) {
        throw error;
    }
};
