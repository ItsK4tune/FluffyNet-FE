import axios from "axios";
import { env } from "../../libs";
import { useAuthStore } from "../../stores/auth-store"; 

const authHeader = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, 
  };
};

const handleRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  try {
    return await requestFn();
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(`${env.be.url}/api/auth/refresh`, null, {
          withCredentials: true,
        });
        const newAccessToken = refreshRes.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        return await requestFn();
      } catch (refreshError) {
        useAuthStore.getState().logout();
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

// Lấy danh sách gợi ý kết bạn
export const getSuggestions = async () => {
  return handleRequest(async () => {
    const res = await axios.get(`${env.be.url}/api/follow/follow-suggest`, authHeader());
    return res.data;
  });
};

// Lấy danh sách followers
export const getFollowers = async (userId: number) => {
  return handleRequest(async () => {
    const res = await axios.get(`${env.be.url}/api/follow/follower`, {
      ...authHeader(),
      params: { user_id: userId },
    });
    return res.data;
  });
};

// Lấy danh sách following
export const getFollowing = async (userId: number) => {
  return handleRequest(async () => {
    const res = await axios.get(`${env.be.url}/api/follow/following`, {
      ...authHeader(),
      params: { user_id: userId },
    });
    return res.data;
  });
};

// Follow hoặc unfollow người dùng
export const toggleFollowUser = async (target_id: number) => {
  return handleRequest(async () => {
    const res = await axios.post(
      `${env.be.url}/api/follow`,
      { target_id },
      authHeader()
    );
    return res.data;
  });
};
