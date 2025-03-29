import axios from "axios";
import { env } from "../../libs";

export const resetPassword = async (newPassword: string, token: string) => {
    try {
        const payload: { newPassword: string } = { newPassword };

        const data = await axios.post(`${env.be.url}/api/auth/reset-password?token=${token}`, payload, {
            headers: { "Content-Type": "application/json" }
        });

        return data;
    } catch (error) {
        throw error;
    }
};
