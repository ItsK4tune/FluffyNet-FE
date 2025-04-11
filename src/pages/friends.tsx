import { useEffect, useState } from "react";
import { FriendItem } from "../components/follow/friend-item";
import { Navbar } from "../components/elements/navbar";
import {
  getFollowers,
  getFollowing,
  getSuggestions,
  // followUser,
  // unfollowUser,
} from "../services/follow/friends";

interface Friend {
  user_id: number;
  name: string;
  avatar: string;
  status: "follow" | "unfollow" | "follow-back";
}

const tabs = ["Followers", "Following"] as const;
type TabType = (typeof tabs)[number];

export const Friend = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Followers");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<Friend[]>([]);

  // Dùng dữ liệu fake tạm thời
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fakeData: Record<string, Friend[]> = {
          followers: [
            {
              user_id: 1,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 2,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 3,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 4,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 5,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 6,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 7,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 8,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 9,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 10,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 11,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
            {
              user_id: 12,
              name: "Charlie",
              avatar: "https://i.pravatar.cc/40?img=3",
              status: "follow-back",
            },
          ],
          following: [
            {
              user_id: 13,
              name: "David",
              avatar: "https://i.pravatar.cc/40?img=4",
              status: "unfollow",
            },
          ],
        };
        const data = fakeData[activeTab.toLowerCase()];
        setFriends(data);

        const suggestionData: Friend[] = [
          {
            user_id: 14,
            name: "Alice",
            avatar: "https://i.pravatar.cc/40?img=1",
            status: "follow",
          },
          {
            user_id: 15,
            name: "Bob",
            avatar: "https://i.pravatar.cc/40?img=2",
            status: "follow",
          },
        ];
        setSuggestions(suggestionData);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleAction = async (
    user_id: number,
    currentStatus: Friend["status"]
  ) => {
    try {
      if (currentStatus === "follow" || currentStatus === "follow-back") {
        // await followUser(user_id);
      } else if (currentStatus === "unfollow") {
        // await unfollowUser(user_id);
      }
      // refresh lại
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
                  <FriendItem
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
                <FriendItem
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
