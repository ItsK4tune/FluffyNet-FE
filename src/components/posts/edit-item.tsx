import { useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import useCurrentUser from "../../hooks/useCurrentUser";
import usePostEditModal from "../../hooks/usePostEditModal";

interface EditItemProps {
    post: Record<string, any>;
}

const EditItem: React.FC<EditItemProps> = ({ post }) => {
    const { data: currentUser } = useCurrentUser();
    const postEditModal = usePostEditModal();

    const onEdit = useCallback((event: any) => {
        event.stopPropagation();
        postEditModal.setPostId(post.post_id);
        postEditModal.onOpen();
    }, [post.post_id, postEditModal]);

    return (
        post.user_id === currentUser?.user_id && (
            <div
                onClick={onEdit}
                className="
                    flex 
                    items-center 
                    space-x-1 
                    text-gray-500 
                    hover:text-green-500 
                    text-sm 
                    cursor-pointer
                "
            >
                <AiOutlineEdit size={18} />
                <span>Edit</span>
            </div>
        )
    );
}
export default EditItem;