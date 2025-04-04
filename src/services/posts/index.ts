/* eslint-disable no-useless-catch */
import axios from "axios";
import { env } from "../../libs";
const API_URL = `${env.be.url}/api/post`;

const getAccesToken = () => {
    return localStorage.getItem("accessToken");
}

export const createPost = async (
    body?: string,
    image?: string,
    video?: string,
    repost_id?: number
) => {
    try {
        const payload = { body, image, video, repost_id };
        
        const token = getAccesToken();
        if (!token) throw new Error("No access token found");

        const respone = await axios.post(API_URL, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return respone.data;
    } catch (error) {
        throw error;
    }
};

export const getPosts = async (user_id?: number) => {
    try {
        const token = getAccesToken();
        if (!token) throw new Error("No access token found");

        const url = user_id ? `${API_URL}/?user_id=${user_id}` : API_URL;

        const respone = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return respone.data;


    } catch (error) {
        throw error;
    }
}