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

export const generateUploadUrl = async (
    fileName: string,
    fileType: 'image' | 'video',
): Promise<{ uploadUrl: string; objectName: string }> => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error('No access token found');

        const makeRequest = async (accessToken: string) => {
            const response = await axios.post(
                `${env.be.url}/api/post/upload-url`,
                { fileName, fileType },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            return response;
        };

        try {
            const response = await makeRequest(token);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.warn("Access token expired, refreshing...");
                token = await refreshAccessToken();
                if (!token) throw new Error("No access token found");
                const response = await makeRequest(token);
                return response.data;
            }
            throw error;
        }
    } catch (error) {
        console.error("Error generating upload URL:", error);
        throw error;
    }
};

export const generateDownLoadUrl = async (objectName: string): Promise<string | null> => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error('No access token found');

        const makeRequest = async (accessToken: string) => {
            const response = await axios.get(
                `${env.be.url}/api/post/download-url`,
                {
                    params: { objectName },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            return response;
        };

        try {
            const response = await makeRequest(token);
            return response.data.url;
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.warn("Access token expired, refreshing...");
                token = await refreshAccessToken();
                if (!token) throw new Error("No access token found");
                const response = await makeRequest(token);
                return response.data.url;
            }
            throw error;
        }
    } catch (error) {
        console.error("Error generating download URL:", error);
        throw error;
    }
}

export const attachFileToPost = async (
    post_id: number,
    objectName: string,
    fileType: "image" | "video"
) => {
    try {
        let token = getAccessToken();
        if (!token) throw new Error("No access token found");

        const makeRequest = async (accessToken: string) => {
            return await axios.post(
                `${env.be.url}/api/post/${post_id}/attach-file`,
                { objectName, fileType },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );
        };

        try {
            const response = await makeRequest(token);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.warn("Access token expired, refreshing...");
                token = await refreshAccessToken();
                if (!token) throw new Error("No access token found");
                const response = await makeRequest(token);
                return response.data;
            }
            throw error;
        }
    } catch (error) {
        console.error("Error attaching file to post:", error);
        throw error;
    }
};