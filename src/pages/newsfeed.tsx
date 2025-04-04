import Form from "../components/form";
import PostFeed from "../components/posts/posts-feed";

export default function NewsFeed() {
    return (
        <>
            <Form placeholder="What's happening?" />
            <PostFeed />
        </>
    );
}