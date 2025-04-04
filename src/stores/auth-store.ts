import axios from 'axios';
import { create } from 'zustand';
import { env } from '../libs';

interface UserInfo {
  user_id: number;
  username: string;
  role: string;
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: UserInfo | null; 
  isLoading: boolean; 
  setAccessToken: (token: string | null) => void;
  setUser: (user: UserInfo | null) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  checkAuthStatus: () => Promise<void>; 
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setAccessToken: (token) => {
        const isAuthenticated = !!token; 
        set({ accessToken: token, isAuthenticated });
        if (!isAuthenticated) {
            set({ user: null });
        }
    },

    setUser: (userInfo) => {
        set({ user: userInfo });
    },

    clearAuth: () => {
        set({ accessToken: null, isAuthenticated: false, user: null });
    },

    setLoading: (loading) => {
        set({ isLoading: loading });
    },

    checkAuthStatus: async () => {
        if (!get().isLoading) return;

        const accessToken = get().accessToken;
        try {
            const response = await axios.get(`${env.be.url}/api/auth/status`, { 
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (response.status === 200 && response.data?.isAuthenticated) {
                set({ isAuthenticated: true, user: response.data.user, isLoading: false });
            } else {
                throw new Error("Not authenticated");
            }
        } catch (error) {
            get().clearAuth(); 
        } finally {
            set({ isLoading: false }); 
        }
    }
}));

export const { setAccessToken, setUser, clearAuth, setLoading, checkAuthStatus } = useAuthStore.getState();