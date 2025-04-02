import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Cho các liên kết điều hướng
// Giả sử bạn có các component này (cần tạo riêng)
// import { Navbar } from '../components/layout/navbar';
// import { CreatePost } from '../components/posts/create-post';
// import { PostCard } from '../components/posts/post-card';
// import { SuggestionsSidebar } from '../components/layout/suggestions-sidebar';
// import { FloatingIconsBackground } from "../components/elements/floating-icon"; // Icon nổi từ trang Reset

// --- Dữ liệu mẫu (SẼ THAY BẰNG API CALL) ---
interface Post {
    id: string;
    author: {
        id: string;
        username: string;
        displayName: string;
        avatarUrl: string;
    };
    content: string;
    imageUrl?: string;
    timestamp: string; // Hoặc Date object
    likes: number;
    comments: number;
    isLiked: boolean; // Người dùng hiện tại đã thích chưa?
}

const samplePosts: Post[] = [
    {
        id: '1',
        author: { id: 'a', username: 'cloud_dreamer', displayName: 'Dreamy Cloud', avatarUrl: 'https://via.placeholder.com/50/FFC0CB/FFFFFF?text=DC' },
        content: "Just floating around today, feeling extra fluffy! What are your weekend plans? ☁️✨ #fluffy #weekendvibes",
        timestamp: "2h ago",
        likes: 15,
        comments: 3,
        isLiked: false,
    },
    {
        id: '2',
        author: { id: 'b', username: 'sparkle_cat', displayName: 'Sparkle Kitty', avatarUrl: 'https://via.placeholder.com/50/DDA0DD/FFFFFF?text=SK' },
        content: "Found the perfect spot for a nap! 😴 This cloud is so comfy!",
        imageUrl: "https://via.placeholder.com/400x300/E6E6FA/A9A9A9?text=Comfy+Cloud+Nap", // Ảnh mẫu
        timestamp: "5h ago",
        likes: 32,
        comments: 7,
        isLiked: true,
    },
     {
        id: '3',
        author: { id: 'c', username: 'rainbow_hopper', displayName: 'Rainbow Hopper', avatarUrl: 'https://via.placeholder.com/50/ADD8E6/FFFFFF?text=RH' },
        content: "Spreading some positive vibes today! Remember to sparkle! ✨💖 #positivity #fluffynet",
        timestamp: "1d ago",
        likes: 25,
        comments: 5,
        isLiked: false,
    },
    // Thêm các bài đăng mẫu khác
];

// --- Placeholder cho các component con ---
const Navbar = () => <nav className="sticky top-0 z-30 w-full h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-8 border-b border-pink-100">
                            <Link to="/" className="text-2xl font-bold text-pink-500 font-serif">FluffyNet <span className="text-xl">☁️</span></Link>
                            {/* Thêm tìm kiếm, icon thông báo, avatar người dùng ở đây */}
                             <div className="flex items-center space-x-4">
                                 <span className="text-gray-600">Search...</span>
                                 <span className="text-gray-600">🔔</span>
                                <Link to="/setting"> <img src="https://via.placeholder.com/40/FFB6C1/FFFFFF?text=FN" alt="User" className="w-9 h-9 rounded-full cursor-pointer"/> </Link>
                            </div>
                         </nav>;
const CreatePost = () => <div className="bg-white p-4 rounded-xl shadow mb-6 border border-pink-100">
                           <textarea placeholder="Share your fluffiness..." className="w-full p-2 border rounded-lg focus:ring-pink-300 focus:border-pink-300 mb-2" rows={3}></textarea>
                           <div className="flex justify-between items-center">
                               {/* Icon thêm ảnh, emoji... */}
                               <div className="flex space-x-2 text-pink-400">
                                    <span>🖼️</span><span>😊</span>
                               </div>
                               <button className="px-5 py-1.5 bg-pink-400 text-white font-semibold rounded-full text-sm hover:bg-pink-500 transition">Post</button>
                           </div>
                         </div>;
const PostCard = ({ post }: { post: Post }) => (
                        <div className="bg-white rounded-xl shadow mb-6 overflow-hidden border border-pink-100">
                           <div className="p-4 flex items-center space-x-3">
                               <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-10 h-10 rounded-full"/>
                               <div>
                                  <p className="font-semibold text-gray-800">{post.author.displayName}</p>
                                  <p className="text-xs text-gray-500">@{post.author.username} · {post.timestamp}</p>
                               </div>
                           </div>
                            <div className="px-4 pb-2 text-gray-700">
                                {post.content}
                            </div>
                           {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover"/>}
                           <div className="flex justify-around border-t border-pink-100 text-gray-500 py-2 px-4 text-sm">
                                <button className={`flex items-center space-x-1 hover:text-pink-500 ${post.isLiked ? 'text-pink-500 font-semibold' : ''}`}>
                                     <span className="text-lg">{post.isLiked ? '💖' : '🤍'}</span>
                                     <span>{post.likes} Likes</span>
                                 </button>
                                <button className="flex items-center space-x-1 hover:text-pink-500">
                                   <span className="text-lg">💬</span>
                                     <span>{post.comments} Comments</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-pink-500">
                                    <span className="text-lg">🔗</span>
                                    <span>Share</span>
                                </button>
                           </div>
                         </div>);
const SuggestionsSidebar = () => <div className="w-72 p-4 bg-white rounded-xl shadow border border-pink-100 hidden lg:block">
                                    <h3 className="font-semibold text-pink-500 mb-3">Who to follow</h3>
                                     {/* Danh sách gợi ý người dùng */}
                                     <div className="text-sm text-gray-600">Maybe @cloud_dreamer?</div>
                                     <div className="text-sm text-gray-600">Perhaps @rainbow_hopper?</div>
                                      {/* Thêm nhiều gợi ý */}
                                     <h3 className="font-semibold text-pink-500 mt-5 mb-3">Trending Fluff</h3>
                                    {/* Danh sách hashtag/chủ đề */}
                                    <div className="text-sm text-blue-500">#cutecats</div>
                                     <div className="text-sm text-blue-500">#positivity</div>
                                 </div>;

const FloatingIconsBackground = () => <div className="absolute inset-0 z-0 opacity-50 pointer-events-none"> {/* Placeholder */}</div>;


// --- Component Index Chính ---
export const Index = () => {
    // State để lưu trữ danh sách bài đăng (lấy từ API)
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Giả lập gọi API khi component mount
    useEffect(() => {
        console.log("Fetching posts...");
        // --- TODO: Thay thế bằng API call thật ---
        setTimeout(() => {
            setPosts(samplePosts);
            setIsLoading(false);
            console.log("Posts loaded");
        }, 1000); // Giả lập độ trễ mạng
    }, []);

    // Memoize background để tránh re-render không cần thiết
    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-rose-100"> {/* Gradient nền nhẹ */}
            {/* Background động (tùy chọn) */}
            <div className="absolute inset-0">
                 {floatingIconsMemo}
            </div>

            {/* Navbar cố định */}
            <Navbar />

            {/* Main content area */}
             <main className="flex-grow container mx-auto max-w-6xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 z-10">

                 {/* Cột Feed Chính (chiếm 2/3 trên màn hình lớn) */}
                 <div className="lg:col-span-2">
                     {/* Khu vực tạo bài đăng */}
                    <CreatePost />

                     {/* Danh sách bài đăng */}
                     {isLoading ? (
                         <div className="text-center text-pink-400 py-10">Loading fluffy posts... <span className="animate-spin inline-block">☁️</span></div>
                     ) : posts.length > 0 ? (
                         posts.map(post => <PostCard key={post.id} post={post} />)
                     ) : (
                         <div className="text-center text-gray-500 py-10">No posts yet. Be the first to share! ✨</div>
                     )}
                      {/* TODO: Thêm nút "Load More" hoặc infinite scroll */}
                 </div>

                 {/* Sidebar (chiếm 1/3 trên màn hình lớn, ẩn trên mobile) */}
                <aside className="lg:col-span-1">
                    <SuggestionsSidebar />
                     {/* Có thể thêm các widget khác vào sidebar */}
                </aside>

             </main>

            {/* Footer (tùy chọn) */}
            {/* <footer className="text-center p-4 text-xs text-gray-500 mt-auto z-10">
                 © {new Date().getFullYear()} FluffyNet - Your world, your stories.
             </footer> */}
        </div>
    );
};