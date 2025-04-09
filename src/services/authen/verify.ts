import axios from "axios";
import { env } from "../../libs"; 

export const verifyEmail = async (token: string) => {
    if (!token) {
        throw new Error("Verification token is missing."); 
    }
    try {
        await axios.get(`${env.be.url}/api/auth/verify`, {
            params: { token: token }
        });
    } catch (error: any) {
        console.error("API call to verify email failed:", error.response?.data || error.message);
        throw error;
    }
};