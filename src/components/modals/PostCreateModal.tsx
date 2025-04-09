import { useCallback, useState } from "react";
import usePosts from "../../hooks/usePosts";
import { toast } from "react-hot-toast";
import Modal from "../modal";
import Input from "../input";
import { createPost } from "../../services/posts";
import usePostCreateModal from "../../hooks/usePostCreateModal";


const PostCreateModal: React.FC = () => {
    const postCreateModal = usePostCreateModal();
    const { mutate: mutatePosts } = usePosts();

    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            const post = await createPost(body);

            toast.success('Post Created!');
            mutatePosts();
            setBody('');
            postCreateModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [body, mutatePosts, postCreateModal]);

    const bodyContent = (
        <div className="flex flex-col">
            <Input
                value={body}
                placeholder="What's happening?"
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
            isOpen={postCreateModal.isOpen}
            title="Create Your Post"
            actionLabel="Create Post"
            onSubmit={onSubmit}
            onClose={postCreateModal.onClose}
            body={bodyContent}
        />
    );

}

export default PostCreateModal;