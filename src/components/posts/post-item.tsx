import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai";
import { Avatar } from "../elements/avatar";
import EditItem from "./edit-item";
import DeleteItem from "./delete-item";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

interface Post {
    post_id: number;
    user_id: number;
    body: string;
    image: string;
    video: string;
    repost_id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface PostItemProps {
    post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const navigate = useNavigate();
    const { data: currentUser } = useCurrentUser();

    const goToUser = useCallback((e: any) => {
        e.stopPropagation();
        navigate(`/users/${post.user_id}`);
    }, [navigate, post.user_id]);

    const goToPost = useCallback((e: any) => {
        e.stopPropagation();
        navigate(`/posts/${post.post_id}`);
    }, [navigate, post.post_id]);

    const createdAt = useMemo(() => {
        if (!post.createdAt) return null;
        return format(new Date(post.createdAt), 'hh:mm a MMM dd, yyyy');
    }, [post.createdAt]);

    return (
        <div
            onClick={goToPost}
            className="bg-white rounded-xl shadow mb-6 overflow-hidden border border-pink-100 cursor-pointer transition hover:shadow-md"
        >
            <div className="p-4 flex items-center space-x-3">
                <Avatar user_id={post.user_id} />
                <div>
                    <p className="font-semibold text-gray-800 hover:underline" onClick={goToUser}>
                        {currentUser?.user_name || `User ${post.user_id}`}
                    </p>
                    <p className="text-xs text-gray-500">@user{post.user_id} · {createdAt}</p>
                </div>
            </div>

            <div className="px-4 pb-2 text-gray-700">
                {post.body}
            </div>

            {post.image && (
                <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto object-cover max-h-72"
                />
            )}

            <div className="flex justify-around border-t border-pink-100 text-gray-500 py-2 px-4 text-sm">
                <button className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                    <AiOutlineHeart size={18} />
                    <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                    <AiOutlineMessage size={18} />
                    <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-yellow-500 cursor-pointer">
                    <AiOutlineShareAlt size={18} />
                    <span>Share</span>
                </button>
                <EditItem post={post} />
                <DeleteItem post={post} />
            </div>
        </div>
    );
};
