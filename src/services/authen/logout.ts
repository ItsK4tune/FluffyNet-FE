import axios from "axios";
import { env } from "../../libs";
import { useAuthStore } from "../../stores/auth-store";

export const logout = async () => {
    try {
        await axios.get(`${env.be.url}/api/auth/logout`, {
            withCredentials: true,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        } else {
            throw new Error("Unknown error during backend logout API call");
        }
    } finally {
        useAuthStore.getState().clearAuth();
    }
};
