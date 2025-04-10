import { useCallback, useEffect, useState } from "react";
import usePostEditModal from "../../hooks/usePostEditModal"
import usePosts from "../../hooks/usePosts";
import { updatePostById } from "../../services/posts/[post_id]";
import { toast } from "react-hot-toast";
import Modal from "../modal";
import Input from "../input";
import usePost from "../../hooks/usePost";

const PostEditModal: React.FC = () => {
    const postEditModal = usePostEditModal();
    const post_id = postEditModal.post_id;
    const { mutate: mutatePosts } = usePosts();
    const { data: fetchedPost, mutate: mutatePost } = usePost(post_id);

    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBody(fetchedPost?.body)
    }, [fetchedPost?.body]);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            await updatePostById(post_id, { body });

            mutatePost();
            mutatePosts();

            toast.success('Post Updated');

            postEditModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [post_id, body, postEditModal, setLoading, mutatePost, mutatePosts]);

    const bodyContent = (
        <div className="flex flex-col">
            <Input
                value={body}
                placeholder="Edit Post"
                disabled={loading}
                onChange={(event) => {
                    event.stopPropagation();
                    setBody(event.target.value);
                }}
            />
        </div>
    );

    return (
        <Modal
            disabled={loading}
            isOpen={postEditModal.isOpen}
            title="Edit Your Post"
            actionLabel="Update Post"
            onSubmit={onSubmit}
            onClose={postEditModal.onClose}
            body={bodyContent}
        />
    );

}

export default PostEditModal;