import axios from "axios";
import { env } from "../../libs";
import { useAuthStore } from "../../stores/auth-store"; 

const authHeader = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách gợi ý kết bạn
export const getSuggestions = async () => {
  const res = await axios.get(`${env.be.url}/api/friends/suggestions`, authHeader());
  return res.data; 
};

// Lấy danh sách followers
export const getFollowers = async () => {
  const res = await axios.get(`${env.be.url}/api/friends/followers`, authHeader());
  return res.data;
};

// Lấy danh sách following
export const getFollowing = async () => {
  const res = await axios.get(`${env.be.url}/api/friends/following`, authHeader());
  return res.data;
};

// Follow người dùng
export const followUser = async (targetUserId: number) => {
  const res = await axios.post(
    `${env.be.url}/api/friends/follow`,
    { targetUserId },
    authHeader()
  );
  return res.data;
};

// Unfollow người dùng
export const unfollowUser = async (targetUserId: number) => {
  const res = await axios.post(
    `${env.be.url}/api/friends/unfollow`,
    { targetUserId },
    authHeader()
  );
  return res.data;
};
