import { useCallback, useState } from "react";
import usePosts from "../hooks/usePosts";
import { toast } from "react-toastify";
import useCurrentUser from "../hooks/useCurrentUser";
import { createPost } from "../services/posts";
import { Avatar } from "./elements/avatar";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    post_id?: number;
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    post_id,
}) => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            if (isComment && post_id) {
                //await createComment(post_id, body);
            } else {
                await createPost(body);
            }

            toast.success('Post created successfully');

            setBody('');
            mutatePosts();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);

    return (
        <div
            className="border-b-[1px] border-neutral-200 px-5 py-2"
        >
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar user_id={currentUser?.id} />
                </div>
                <div className="w-full">
                    <textarea
                        disabled={isLoading}
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        className="
                            disabled: opacity-80
                            peer
                            resize-none
                            mt-3
                            w-full
                            bg-white
                            ring-0
                            outline-none
                            text-[20px]
                            placeholder-neutral-500
                            text-black
                        "
                        placeholder={placeholder}
                    >
                    </textarea>
                    <hr
                        className="
                            opacity-0
                            peer-focus:opacity-10
                            h-[1px]
                            w-full
                            bg-neutral-300
                            transition
                        "
                    />
                    <div className="mt-4 flex flex-row justify-end">
                        <button
                            // className={
                            //     // cn(
                            //     // "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200 lg:hover:outline lg:hover:outline-black ",
                            //     // { "opacity-50 cursor-not-allowed": isLoading }
                            // )}
                            disabled={isLoading || !body}
                            onClick={onSubmit}
                            className="
                                rounded-full
                                border-2
                                font-semibold
                                transition
                                hover: opacity-80
                                disabled: cursor-not-allowed
                                disabled: opacity-70
                                w-fit
                                bg-pink-300
                                text-black 
                                border-neutral-200
                                text-md
                                px-4
                                py-2
                            "
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;