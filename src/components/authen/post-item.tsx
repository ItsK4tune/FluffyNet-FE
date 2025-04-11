import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { Avatar } from "../elements/Avatar";

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
    data: Post;
    user_id: number;
}

export const PostItem: React.FC<PostItemProps> = ({ data, user_id }) => {

    const goToUser = useCallback(() => {

    }, []);

    const goToPost = useCallback(() => {

    }, []);

    const onLike = useCallback(() => {

    }, []);

    const onComment = useCallback(() => {

    }, []);

    const createdAt = useMemo(() => {
        if (!data.createdAt) {
            return null;
        }
        return format(new Date(data.createdAt), 'hh:mm a MMMM dd, yyyy');
    }, [data.createdAt]);

    return (
        <div
            onClick={goToPost}
            className="
                border-b-[1px]
                border-neutral-200
                p-5
                hover:border-neutral-300
                transition
            "
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar user_id={user_id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser}
                            className="text-black font-semibold cursor-pointer hover:underline"
                        >
                            {data.user_id}
                        </p>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    {data.image && ( 
                        <div className="mt-3">
                            <img 
                                src={data.image} 
                                alt="Post image"
                                className="max-h-60 object-cover rounded-md w-full" 
                            />
                        </div> 
                    )}
                    <div className="text-black mt-1">{data.body}</div>

                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            onClick={onLike}
                            className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition"
                        >
                            <AiOutlineHeart size={20} />
                        </div>
                        <div
                            onClick={onComment}
                            className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition"
                        >
                            <AiOutlineMessage size={20} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}