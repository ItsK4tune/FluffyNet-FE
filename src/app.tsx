import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { env } from "./libs";
import { useAuthStore } from "./stores/auth-store";
import { Toaster } from "react-hot-toast";
import PostEditModal from "./components/modals/PostEditModal";
import PostCreateModal from "./components/modals/PostCreateModal";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoading,
    setLoading,
    setUser,
    setAccessToken,
    clearAuth,
  } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      console.log("App Mount: Initializing authentication (direct axios)...");

      const tryRefreshToken = async (): Promise<string | null> => {
        try {
          console.log("App Mount: Attempting refresh (direct axios)...");
          const response = await Promise.race([
            axios.get<{ accessToken: string }>(
              `${env.be.url}/api/auth/refresh`,
              {
                withCredentials: true,
              }
            ) as Promise<{ data: { accessToken: string } }>,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timeout!")), 3000)
            ),
          ]);
          return (response as { data: { accessToken: string } }).data
            .accessToken;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log(
              "App Mount: Refresh failed (401 - direct axios). No valid session."
            );
          } else {
            console.error(
              "App Mount: Error during refresh (direct axios):",
              error
            );
          }
          return null;
        }
      };

      const fetchUserStatus = async (token: string): Promise<any | null> => {
        if (!token) return null;
        try {
          console.log("App Mount: Fetching user status (direct axios)...");
          const response = await Promise.race([
            axios.get(`${env.be.url}/api/auth/status`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }) as Promise<{ data: { accessToken: string } }>,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timeout!")), 3000)
            ),
          ]);
          const formatedResponse = response as {
            data: { isAuthenticated: boolean; user: any };
          };
          if (
            formatedResponse.data?.isAuthenticated &&
            formatedResponse.data?.user
          ) {
            return formatedResponse.data.user;
          }
          return null;
        } catch (error) {
          console.error(
            "App Mount: Error fetching status (direct axios):",
            error
          );
          return null;
        }
      };

      const newAccessToken = await tryRefreshToken();

      if (isMounted) {
        if (newAccessToken) {
          console.log(
            "App Mount: Session valid, received new AT (direct axios)."
          );
          setAccessToken(newAccessToken);

          const userInfo = await fetchUserStatus(newAccessToken);
          if (isMounted) {
            if (userInfo) {
              setUser(userInfo);
              console.log(
                "App Mount: User info updated (direct axios):",
                userInfo
              );
              navigate("/");
            } else {
              console.warn(
                "App Mount: Could not fetch user info after refresh (direct axios)."
              );
              clearAuth();
            }
          }
        } else {
          clearAuth();
        }
        setLoading(false);
      }
    };

    if (isLoading) {
      initializeAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [isLoading, setAccessToken, setUser, clearAuth, setLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

     if (!isAuthenticated) {
          if (location.pathname !== '/login') {
               console.log("App: Not authenticated. Redirecting to login (direct axios flow).");
               return <Navigate to="/login" state={{ from: location }} replace />;
          }
     }
     return (
          <>
               <Outlet />;
               <Toaster />;
               <PostEditModal />;
               <PostCreateModal />
          </>
     );
};
