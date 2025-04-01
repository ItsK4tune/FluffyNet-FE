import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SessionExpiredModal } from "./components/session-expire";
import { useEffect, useRef, useState } from "react";

const checkAuthentication = (): boolean => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("jwt:")) {
      return true;
    }
  }
  return false;
};

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const isCheckingRef = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCheckingRef.current) {
        isCheckingRef.current = true;
        const stillAuthenticated = checkAuthentication();
          if (isAuthenticated && !stillAuthenticated) {
            console.warn("Auth check failed: Session likely expired or token removed.");
            setIsAuthenticated(false);
              setShowExpiryModal(true); 
          } else if (!isAuthenticated && stillAuthenticated) {
              setIsAuthenticated(true);
            setShowExpiryModal(false); 
          }
          isCheckingRef.current = false;
        }
    }, 3000); 

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  if (showExpiryModal) {
    return (
          <>
            <SessionExpiredModal isOpen={true} />
          </>
    );
  }

  if (isAuthenticated) {
      return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}
