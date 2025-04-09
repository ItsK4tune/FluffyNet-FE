import { useCallback } from "react"
import { AiOutlineDelete } from "react-icons/ai";
import useCurrentUser from "../../hooks/useCurrentUser";
import useDeletePost from "../../hooks/useDeletePost";

interface DeleteItemProps {
    post: Record<string, any>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ post }) => {
    const { post_id, user_id } = post;
    const { data: currentUser } = useCurrentUser()
    const deletePost = useDeletePost({ post_id, user_id });

    const onDelete = useCallback((event: any) => {
        event.stopPropagation();
        deletePost();
    }, [deletePost]);

    return (
        (post.user_id === currentUser?.user_id &&
            <div
                onClick={onDelete}
                className="
                    flex 
                    items-center 
                    space-x-1 
                    text-gray-500 
                    hover:text-black 
                    text-sm 
                    cursor-pointer"
            >
                <AiOutlineDelete size={18} />
                <span>Delete</span>
            </div>
        )
    );
}

export default DeleteItem;