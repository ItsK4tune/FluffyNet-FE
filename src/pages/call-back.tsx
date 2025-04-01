import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
        try {
            const decoded: any = jwtDecode(token); 
            const email = decoded.jwtPayload?.email;

            if (email) {
                Object.keys(localStorage).forEach((key) => {
                    if (key.startsWith("jwt:")) {
                        localStorage.removeItem(key);
                    }
                });
                localStorage.setItem(`jwt:${email}`, token); 
            }

            navigate("/");
        } catch (error) {
            console.error("Invalid JWT Token", error);
            navigate("/login"); 
        }
        } else {
        navigate("/login");
        }
    }, [navigate]);

    return <></>
}
