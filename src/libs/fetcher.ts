import axios from "axios";
import { useAuthStore } from "../stores/auth-store"
import { env } from "../libs";

const fetcher = async (url: string) => {
    const { accessToken, setAccessToken, clearAuth } = useAuthStore.getState();

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn("fetcher: Got 401, trying refresh...");

            try {
                const refreshResponse = await axios.get(`${env.be.url}/api/auth/refresh`, {
                    withCredentials: true,
                });

                const newAccessToken = refreshResponse.data.accessToken;

                setAccessToken(newAccessToken);

                const retryResponse = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${newAccessToken},`
                    },
                    withCredentials: true,
                });

                return retryResponse.data;
            } catch (refreshError) {
                console.error("fetcher: Refresh failed. Logging out.");
                clearAuth();
                throw refreshError;
            }

        } else {
            throw error;
        }
    }
}

export default fetcher;