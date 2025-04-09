import useSWR from 'swr';
import { env } from "../libs/index";
import fetcher from '../libs/fetcher';

const useCurrentUser = () => {

    const { data, error, isLoading, mutate } = useSWR(`${env.be.url}/api/auth/status`, fetcher);

    return {
        data: data?.user ?? null,
        error,
        isLoading,
        mutate        
    };
};

export default useCurrentUser;