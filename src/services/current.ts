import axios from "axios";
import { env } from "../libs";

const API_URL = `${env.be.url}/api/profile`;
/* eslint-disable no-useless-catch */
const getAccesToken = () => {
    return localStorage.getItem("accessToken");
}

export const getCurrentUser = async () => {
    try {
        const token = getAccesToken();
        if (!token) throw new Error("No access token found");

        const respone = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return respone.data;
    } catch (error) {
        throw error;
    }
};