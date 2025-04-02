import axios from "axios";
import { env } from "../../libs";

export const logout = async () => {
    let authenKey: string | null = null;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("jwt:")) {
            authenKey = key;
            break;
        }
    }

    if (!authenKey) {
        return; 
    }

    try {
        await axios.get(`${env.be.url}/api/auth/logout`, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem(authenKey ?? '')}` }
        });

        localStorage.removeItem(authenKey ?? '');
    } catch (error) {
        throw error;
    }
};
