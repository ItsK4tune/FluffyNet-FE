import usePosts from "../../hooks/usePosts";
import { PostItem } from "./post-item";

interface PostsFeedProps {
    user_id?: number;
}

const PostsFeed: React.FC<PostsFeedProps> = ({ user_id }) => {
    const { data: posts = [] } = usePosts(user_id);

    return (
        <>
            {
                posts.map((post: Record<string, any>) => (
                    <PostItem 
                        key={post.post_id}
                        user_id={user_id}
                        data={post}
                    />
                ))
            }
        </>
    );
}
export default PostsFeed;