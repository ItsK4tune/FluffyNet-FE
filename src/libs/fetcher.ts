/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useAuthStore } from "../stores/auth-store";
import { env } from "../libs/index";

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("No refresh token found. Redirecting to login...");
        window.location.href = "/login"; // Redirect to login page
        throw new Error("No refresh token found");
    }

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

        return accessToken;
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.error("Refresh token invalid or expired. Redirecting to login...");
            window.location.href = "/login"; // Redirect to login page
        }
        console.error("Error refreshing access token:", error);
        throw new Error("Failed to refresh access token");
    }
};

const fetcher = async (url: string) => {
    let token = useAuthStore.getState().accessToken;
    if (!token) throw new Error("No access token found");

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.warn("Access token expired, attempting to refresh...");

            try {
                // Refresh the access token
                token = await refreshAccessToken();

                // Retry the request with the new token
                const retryResponse = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                return retryResponse.data;
            } catch (refreshError) {
                console.error("Failed to refresh token or retry request:", refreshError);
                window.location.href = "/login"; // Redirect to login page
                throw refreshError;
            }
        }

        if (error.response?.status === 500) {
            console.error("Server error (500):", error.response.data);
            throw new Error("Internal server error. Please try again later.");
        }

        console.error("Error during fetch:", error);
        throw error;
    }
};

export default fetcher;