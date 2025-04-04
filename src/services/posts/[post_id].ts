/* eslint-disable no-useless-catch */
import axios from "axios";
import { env } from "../../libs";

const API_URL = `${env.be.url}/api/post`;

const getAccesToken = () => {
    return localStorage.getItem("accessToken");
}

export const getPostById = async (post_id: number) => {
    try {
        const token = getAccesToken();
        if(!token) throw new Error("No access token");

        const respone = await axios.get(`${API_URL}/${post_id}`, {
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

export const updatedPostById = async ( 
    post_id: number,
    data: {
        body?: string;
        image?: string;
        video?: string;
    }
) => {
    try {
        const token =  getAccesToken();
        if(!token) throw new Error("No access token");

        const respone = await axios.patch(`${API_URL}/${post_id}`, data, {
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

export const deletePostById = async (post_id: number) => {
    try {
        const token = getAccesToken();
        if (!token) throw new Error("No access token found");

        const respone = await axios.delete(`${API_URL}/${post_id}`, {
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