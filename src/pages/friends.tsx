import { useEffect, useState } from "react";
import { FriendItem } from "../components/authen/friend-item";
import { Navbar } from "../components/elements/navbar";
import {
  getFollowers,
  getFollowing,
  getSuggestions,
  followUser,
  unfollowUser,
} from "../services/authen/friends";

interface Friend {
  user_id: number;
  name: string;
  avatar: string;
  status: "follow" | "unfollow" | "follow-back";
}

const tabs = ["Suggestions", "Followers", "Following"] as const;
type TabType = (typeof tabs)[number];

export const Friend = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Suggestions");
  const [friends, setFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    try {
      let data: Friend[] = [];
      if (activeTab === "Suggestions") {
        data = await getSuggestions();
      } else if (activeTab === "Followers") {
        data = await getFollowers();
      } else if (activeTab === "Following") {
        data = await getFollowing();
      }
      setFriends(data);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [activeTab]);

  const handleAction = async (user_id: number, currentStatus: Friend["status"]) => {
    try {
      if (currentStatus === "follow" || currentStatus === "follow-back") {
        await followUser(user_id);
      } else if (currentStatus === "unfollow") {
        await unfollowUser(user_id);
      }
      await fetchFriends(); // Refresh danh sách sau khi action
    } catch (err) {
      console.error("Error handling follow/unfollow:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeIcon="friend"/>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold px-4 py-2 cursor-pointer rounded-full transition ${
              activeTab === tab
                ? "bg-rose-200 text-gray-600"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4 max-w-xl mx-auto border border-neutral-200 rounded-md overflow-hidden">
        {friends.length === 0 ? (
          <p className="text-center py-10 text-neutral-500 text-sm">
            No users found.
          </p>
        ) : (
          friends.map((friend) => (
            <FriendItem
              key={friend.user_id}
              {...friend}
              onAction={() => handleAction(friend.user_id, friend.status)}
            />
          ))
        )}
      </div>
    </div>
  );
};
