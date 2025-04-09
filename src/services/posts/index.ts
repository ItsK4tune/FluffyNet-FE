/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { env } from "../../libs";
import { useAuthStore } from "../../stores/auth-store";

const API_URL = `${env.be.url}/api/post`;

const getAccessToken = () => {
    return useAuthStore.getState().accessToken;
};

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    try {
        const response = await axios.post(`${env.be.url}/api/auth/refresh`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update Zustand store
        useAuthStore.getState().setAccessToken(accessToken);

        // Fetch user info and update store
        const userStatus = await axios.get(`${env.be.url}/api/auth/status`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        if (userStatus.status === 200 && userStatus.data.user) {
            useAuthStore.getState().setUser(userStatus.data.user);
        }

        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

export const createPost = async (
    body?: string,
    image?: string,
    video?: string,
    repost_id?: number
) => {
    try {
        const payload = { body, image, video, repost_id };
        let token = getAccessToken();
        if (!token) throw new Error("No access token found");

        try {
            const response = await axios.post(API_URL, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.warn("Access token expired, refreshing...");
                token = await refreshAccessToken();

                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                return response.data;
            }
            throw error;
        }
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const getPosts = async (user_id?: number) => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error("No access token found");

        const url = user_id ? `${API_URL}/?user_id=${user_id}` : `${API_URL}/list/all`;

        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.warn("Access token expired, refreshing...");
                token = await refreshAccessToken();

                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                return response.data;
            }
            throw error;
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};
