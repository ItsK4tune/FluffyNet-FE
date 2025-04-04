import useSWR from 'swr';

import { getPosts } from '../services/posts';

const usePosts = (user_id?: number) => {
    const { data, error, isLoading, mutate } = useSWR(
        user_id ? ['posts', user_id] : ['posts'], 
        () => getPosts(user_id ? Number(user_id) : undefined)
    );

    return { data, error, isLoading, mutate };
};

export default usePosts;