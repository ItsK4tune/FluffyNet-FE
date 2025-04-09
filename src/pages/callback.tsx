import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { env } from "../libs"; 
import { FloatingIconsBackground } from "../components/elements/floating-icon";
import { useAuthStore } from "../stores/auth-store";

export const Callback = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    const navigate = useNavigate();
    const { setAccessToken, setUser, setLoading } = useAuthStore();

    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    useEffect(() => {
        let isMounted = true;

        const handleAuthCallback = async () => {
            if (accessToken) {
                console.log("[Callback] Received accessToken from URL parameter.");
                setAccessToken(accessToken);

                try {
                    console.log("[Callback] Fetching user status with new token (using direct axios)...");
                    const response = await axios.get(
                        `${env.be.url}/api/auth/status`,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            },
                            withCredentials: true 
                        }
                    );

                    if (isMounted && response.data?.isAuthenticated && response.data?.user) {
                        setUser(response.data.user);
                        console.log("[Callback] User info set in store:", response.data.user);
                    } else {
                        throw new Error("Failed to verify token or get user data (axios).");
                    }
                } catch (error) {
                    console.error("[Callback] Error fetching user status after obtaining token (axios):", error);
                    useAuthStore.getState().clearAuth();
                    navigate("/login", { replace: true });
                    return;
                }

                window.history.replaceState({}, document.title, window.location.pathname);
                console.log("[Callback] Token removed from URL.");

                if (isMounted) {
                    console.log("[Callback] Navigating to home page.");
                    navigate("/", { replace: true });
                }
            } else {
                console.error("[Callback] No accessToken found in URL parameters.");
                if (isMounted) {
                    navigate("/login?error=missing_token", { replace: true });
                }
            }

            if (isMounted) setLoading(false);
        };

        setLoading(true);
        handleAuthCallback();

        return () => {
            isMounted = false;
         };
    }, [searchParams, navigate, setAccessToken, setUser, setLoading, accessToken]); 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center">
           <div className="absolute inset-0 -z-10">
                {floatingIconsMemo}
            </div>
           <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Processing Authentication...</h1>
                <p className="text-gray-600">Please wait while we securely log you in.</p>
               <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
           </div>
        </div>
    );
};