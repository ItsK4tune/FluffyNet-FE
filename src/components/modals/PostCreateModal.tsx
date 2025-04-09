import { useCallback, useState } from "react";
import usePosts from "../../hooks/usePosts";
import { toast } from "react-hot-toast";
import Modal from "../modal";
import Input from "../input";
import { attachFileToPost, createPost, generateUploadUrl } from "../../services/posts";
import usePostCreateModal from "../../hooks/usePostCreateModal";
import FileUpload from "../file-upload";


const PostCreateModal: React.FC = () => {
    const postCreateModal = usePostCreateModal();
    const { mutate: mutatePosts } = usePosts();

    const [body, setBody] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            const { post } = await createPost(body);
            toast.success('Post Created!');

            if (file) {
                const fileType = file.type.startsWith("image") ? "image" : "video";
                const { uploadUrl, objectName } = await generateUploadUrl(file.name, fileType);

                await fetch(uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-type": file.type,
                    },
                    body: file,
                });

                await attachFileToPost(post.post_id, objectName, file.type.startsWith("image") ? "image" : "video");
            }

            mutatePosts();
            setBody('');
            setFile(null);
            postCreateModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [body, file, mutatePosts, postCreateModal]);

    const bodyContent = (
        <div className="flex flex-col">
            <FileUpload 
                onFileSelect={(selectedFile) => setFile(selectedFile)}
            />
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