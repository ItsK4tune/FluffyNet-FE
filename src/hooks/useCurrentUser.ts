import useSWR from 'swr';
import { getCurrentUser } from '../services/current';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('currentUser', getCurrentUser);
    return { data, error, isLoading, mutate };
}
export default useCurrentUser;