import useSWR from "swr";
import { env } from "../libs"; 
import fetcher from "../libs/fetcher";


const usePost = (post_id?: number) => {
    const url = post_id ? `${env.be.url}/api/post/${post_id}` : null;

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    
    const post = data?.post ?? null;
    
    return { data: post, error, isLoading, mutate } ;
};

export default usePost;