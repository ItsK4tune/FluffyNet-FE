import axios from "axios";
import { env } from "../libs";

export const forgotPassword = async (email: string) => {
    try {
        const payload: { email: string } = { email };

        await axios.post(`${env.be.url}/api/auth/forgot-password`, payload, {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        throw error;
    }
};
