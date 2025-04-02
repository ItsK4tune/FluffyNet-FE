import axios from "axios";
import { env } from "../../libs";

export const bindEmail = async (token: string, email: string) => {
    try {
        const payload: { email: string } = { email };
        
        await axios.post(`${env.be.url}/api/auth/verify-email`, payload, {
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        });
    } catch (error) {
        throw error;
    }
};
