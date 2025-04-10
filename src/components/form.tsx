import { useCallback, useState } from "react";
import usePosts from "../hooks/usePosts";
import toast from "react-hot-toast";
import useCurrentUser from "../hooks/useCurrentUser";
import { createPost } from "../services/posts";
import { Avatar } from "./elements/avatar";
import usePostCreateModal from "../hooks/usePostCreateModal";

interface FormProps {
    placeholder: string;
    post_id?: number;
}

const Form: React.FC<FormProps> = ({
    placeholder,
    post_id,
}) => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const postCreateModal = usePostCreateModal();

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await createPost(body);             

            toast.success('Post created!');
            setBody('');
            mutatePosts();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6 border border-pink-100">
            <div className="flex items-start gap-4">
                <Avatar user_id={currentUser?.user_id} />
                <div className="flex-1">
                    <textarea
                        disabled={isLoading}
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        className="w-full p-2 border rounded-lg focus:ring-pink-300 focus:border-pink-300 mb-2 resize-none text-[16px] placeholder-neutral-500 text-black disabled:opacity-70"
                        placeholder={placeholder}
                        rows={3}
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2 text-pink-400 text-xl cursor-pointer">
                            <span title="Add Image" onClick={() => postCreateModal.onOpen()} >🖼️</span>
                            <span title="Add Emoji" onClick={() => postCreateModal.onOpen()}>😊</span>
                        </div>
                        <button
                            disabled={isLoading || !body}
                            onClick={onSubmit}
                            className="
                                px-5
                                py-1.5
                                bg-pink-400
                                text-black
                                font-semibold
                                rounded-full
                                text-sm
                                hover:bg-pink-500
                                transition
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
