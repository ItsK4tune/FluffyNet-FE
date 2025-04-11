import fetcher from "../../libs/fetcher";

// Lấy danh sách gợi ý follow
export const getSuggestions = async () => {
  return fetcher.get("/api/follow/follow-suggest");
};

// Lấy danh sách followers
export const getFollowers = async (userId: number) => {
  return fetcher.get("/api/follow/follower", {
    params: { user_id: userId },
  });
};

// Lấy danh sách following
export const getFollowing = async (userId: number) => {
  return fetcher.get("/api/follow/following", {
    params: { user_id: userId },
  });
};

// Follow người dùng
export const followUser = async (target_id: number) => {
  return fetcher.post("/api/follow", { target_id });
};

// Unfollow người dùng
export const unfollowUser = async (target_id: number) => {
  return fetcher.delete("/api/follow", {
    data: { target_id },
  });
};
