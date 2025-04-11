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

const request = async (method: "get" | "post" | "delete", url: string, options: any = {}) => {
    let token = useAuthStore.getState().accessToken;
    if (!token) throw new Error("No access token found");
  
    try {
      const response = await axios({
        method,
        url: `${env.be.url}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        ...options,
      });
  
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          token = await refreshAccessToken();
          const retryResponse = await axios({
            method,
            url: `${env.be.url}${url}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            ...options,
          });
          return retryResponse.data;
        } catch (refreshError) {
          window.location.href = "/login";
          throw refreshError;
        }
      }
  
      throw error;
    }
  };
  
 
  const fetcher = {
    get: (url: string, config?: any) => request("get", url, config),
    post: (url: string, data?: any, config?: any) => request("post", url, { ...config, data }),
    delete: (url: string, config?: any) => request("delete", url, config),
  };
  
  export default fetcher;