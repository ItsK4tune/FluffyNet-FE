import { useEffect, useState } from "react";
import { FollowItem } from "../components/follow/follow-item";
import { Navbar } from "../components/elements/navbar";
import {
  getFollowers,
  getFollowing,
  getSuggestions,
  followUser,
  unfollowUser,
} from "../services/follow/follow";
import { useAuthStore } from "../stores/auth-store";

interface Follow {
  user_id: number;
  name: string;
  avatar: string;
  status: "follow" | "unfollow" | "follow-back";
}

const tabs = ["Followers", "Following"] as const;
type TabType = (typeof tabs)[number];

export const Follow = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Followers");
  const [friends, setFriends] = useState<Follow[]>([]);
  const [suggestions, setSuggestions] = useState<Follow[]>([]);
  const userId = useAuthStore((state) => state.user?.user_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        if (activeTab === "Followers") {
          const followers = await getFollowers(userId);
          setFriends(followers);
        } else if (activeTab === "Following") {
          const following = await getFollowing(userId);
          setFriends(following);
        }

        const suggestionData = await getSuggestions();
        setSuggestions(suggestionData);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  const handleAction = async (
    user_id: number,
    currentStatus: Follow["status"]
  ) => {
    try {
      if (currentStatus === "follow" || currentStatus === "follow-back") {
        await followUser(user_id);
      } else if (currentStatus === "unfollow") {
        await unfollowUser(user_id);
      }
      // Refresh dữ liệu sau khi hành động
      if (activeTab === "Followers") {
        const updated = await getFollowers(userId!);
        setFriends(updated);
      } else if (activeTab === "Following") {
        const updated = await getFollowing(userId!);
        setFriends(updated);
      }
      const suggestionData = await getSuggestions();
      setSuggestions(suggestionData);
    } catch (err) {
      console.error("Error handling follow/unfollow:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <Navbar activeIcon="friend" />
      <main className="container mx-auto max-w-6xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Followers / Following */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-neutral-200">
            {/* Tabs */}
            <div className="flex justify-center gap-6 py-3 border-b border-neutral-300">
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

            {/* Danh sách bạn bè */}
            <div className="px-4">
              {friends.length === 0 ? (
                <p className="text-center py-10 text-neutral-500 text-sm">
                  No users found.
                </p>
              ) : (
                friends.map((friend) => (
                  <FollowItem
                    key={friend.user_id}
                    {...friend}
                    onAction={() => handleAction(friend.user_id, friend.status)}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <aside className="hidden lg:block">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg mb-3 text-rose-400 px-2">
              You may know
            </h2>
            {suggestions.length === 0 ? (
              <p className="text-sm text-neutral-500"> No option.</p>
            ) : (
              suggestions.map((user) => (
                <FollowItem
                  key={user.user_id}
                  {...user}
                  onAction={() => handleAction(user.user_id, user.status)}
                />
              ))
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};
