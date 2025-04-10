/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { env } from "../../libs";
import { useAuthStore } from "../../stores/auth-store";

const API_URL = `${env.be.url}/api/post`;

const getAccessToken = () => useAuthStore.getState().accessToken;
const getRefreshToken = () => localStorage.getItem("refreshToken");

const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    try {
        const response = await axios.post(`${env.be.url}/api/auth/refresh`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        useAuthStore.getState().setAccessToken(accessToken);

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

export const getPostById = async (post_id: number) => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error("No access token");

        try {
            const response = await axios.get(`${API_URL}/${post_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                token = await refreshAccessToken();
                const response = await axios.get(`${API_URL}/${post_id}`, {
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
        console.error("Error fetching post:", error);
        throw error;
    }
};

export const updatePostById = async (
    post_id: number,
    data: {
        body?: string;
        image?: string;
        video?: string;
    }
) => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error("No access token");

        try {
            const response = await axios.patch(`${API_URL}/${post_id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                token = await refreshAccessToken();
                const response = await axios.patch(`${API_URL}/${post_id}`, data, {
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
        console.error("Error updating post:", error);
        throw error;
    }
};

export const deletePostById = async (post_id: number) => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error("No access token");

        try {
            const response = await axios.delete(`${API_URL}/${post_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                token = await refreshAccessToken();
                const response = await axios.delete(`${API_URL}/${post_id}`, {
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
        console.error("Error deleting post:", error);
        throw error;
    }
};
