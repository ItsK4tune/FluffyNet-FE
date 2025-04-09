import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback } from "react";
import { deletePostById } from "../services/posts/[post_id]";

const useDeletePost = ({ post_id, user_id } : {
    post_id: number;
    user_id: number;
}) => {
    const navigate = useNavigate();

    const { mutate: mutateFetchedPost } = usePost(post_id);
    const { mutate: mutateFetchedPosts } = usePosts();
    
    const deletePost = useCallback(async () => {
        try {
            const request = () => deletePostById(post_id);

            await request();

            // if (asPath.startWith("/post/")) {
            //     navigate.back();
            // } else {
            //     mutateFetchedPost();
            //     mutateFetchedPosts();
            // }

            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success("Post Deleted!");
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong!");
        }
    },[post_id, mutateFetchedPost, mutateFetchedPosts]);

    return ( deletePost );
};

export default useDeletePost;