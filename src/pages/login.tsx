import { useEffect, useMemo, useState } from "react";
import { FloatingIconsBackground } from "../components/elements/floating-icon"
import { LoginForm } from "../components/authen/login-form";
import { RegisterForm } from "../components/authen/register-form";
import { ForgotPasswordForm } from "../components/authen/forgot-password-form";

export const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');
    const [state, setState] = useState('login');

    useEffect(() => {
        setMessage('');
    }, [user, pwd])

    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    const renderForm = () => {
        switch (state) {
            case 'login':	
                return <LoginForm user={user} setUser={setUser} pwd={pwd} setPwd={setPwd} message={message} setMessage={setMessage} setState={setState} />;
            case 'register':
                return <RegisterForm user={user} setUser={setUser} pwd={pwd} setPwd={setPwd} message={message} setMessage={setMessage} setState={setState} />;
            case 'forgot':
                return <ForgotPasswordForm message={message} setMessage={setMessage} setState={setState} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex h-screen bg-pink-200">
            {/* Background animated icons */}
            <div className="absolute inset-0">
                {floatingIconsMemo}
            </div>

            {/* Main form */}
            { renderForm() }
        </div>
    )
}