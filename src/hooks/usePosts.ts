import useSWR from 'swr';
import fetcher from '../libs/fetcher';
import { env } from '../libs';

const usePosts = (user_id?: number) => {
    const page = 1;
    const limit = 30;
    
    const API_URL = user_id
        ? `${env.be.url}/api/post/?user_id=${user_id}`
        : `${env.be.url}/api/post/list/all?page=${page}&limit=${limit}`;

    const { data, error, isLoading, mutate } = useSWR(API_URL, fetcher);

    const posts = Array.isArray(data?.posts) ? data.posts : [];

    return { data: posts, error, isLoading, mutate };
};

export default usePosts;