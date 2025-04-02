import { Navigate, Outlet, useLocation } from "react-router-dom"; 
import { SessionExpiredModal } from "./components/session-expire";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user: {
    user_id: number;
    username?: string | null;
    email?: string | null;
    role: string;
  };
  jit: string;
  iat: number;
  exp: number;
}

const getTokenStatus = (): { isValid: boolean; needsModal: boolean } => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("jwt:")) {
      const token = localStorage.getItem(key);

      if (!token) {
        localStorage.removeItem(key); 
        continue;
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          return { isValid: true, needsModal: false };
        } else {
          console.warn(`Token found (${key}) but expired at ${new Date(decoded.exp * 1000)}. Removing.`);
          localStorage.removeItem(key);
          return { isValid: false, needsModal: true };
        }
      } catch (error) {
        console.error(`Error decoding token (${key}):`, error, ". Removing.");
        localStorage.removeItem(key);
         return { isValid: false, needsModal: true };
       }
    }
  }
  
  return { isValid: false, needsModal: false }; 
};


export const App = () => {
  const location = useLocation(); 
  const initialAuthStatus = getTokenStatus();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthStatus.isValid);
  const [showExpiryModal, setShowExpiryModal] = useState(() => {
    return !initialAuthStatus.isValid && initialAuthStatus.needsModal;
  });

   const isCheckingRef = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isCheckingRef.current) return;

      isCheckingRef.current = true;
      const currentAuthStatus = getTokenStatus(); 

      if (isAuthenticated && !currentAuthStatus.isValid) {
        console.warn("Authentication lost.");
        setIsAuthenticated(false);
        if (currentAuthStatus.needsModal) {
          setShowExpiryModal(true);
        }
      } else if (!isAuthenticated && currentAuthStatus.isValid) {
        console.log("Authentication gained (e.g., login in another tab).");
        setIsAuthenticated(true);
        setShowExpiryModal(false); 
       }
      isCheckingRef.current = false;
    }, 5000); 

    return () => clearInterval(intervalId);
   }, [isAuthenticated]); 

  if (showExpiryModal) {
    return (
      <SessionExpiredModal isOpen={true} />
    );
  }

  if (!isAuthenticated) {
    if (location.pathname !== '/login') {
      console.log("Not authenticated, navigating to login from:", location.pathname);
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
      
      return <Outlet />;
    }
  }
  return <Outlet />;
}