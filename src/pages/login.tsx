import { useEffect, useMemo, useState } from "react";
import { FloatingIconsBackground } from "../components/elements/floating-icon"
import { LoginForm } from "../components/authen/login-form";
import { RegisterForm } from "../components/authen/register-form";
import { ForgotPasswordForm } from "../components/authen/forgot-password-form";
import { useSearchParams } from "react-router-dom";
import { AnimatedGradientBackground } from "../components/elements/gradient-background";
import { ParticlesBackground } from "../components/elements/particle";

export const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');
    const [state, setState] = useState('login');

    useEffect(() => {
        const errorType = searchParams.get("type"); 
        const reasonMsg = searchParams.get("message"); 
        const untilDateStr = searchParams.get("until");

        console.log("Processing search params:", { errorType, reasonMsg, untilDateStr });

        let displayMessage = ''; 

        if (errorType === 'ban') {
            displayMessage = 'You have been banned.';
            if (reasonMsg) {
                displayMessage = `You have been banned. Reason: ${reasonMsg}.`;
            }
        } else if (errorType === 'suspend') {
            displayMessage = 'Your account is suspended.';
            if (reasonMsg && untilDateStr) {
                try {
                    const suspendedUntilDate = new Date(untilDateStr);
                    const formattedDate = suspendedUntilDate.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
                    displayMessage = `Your account is suspended. Reason: ${reasonMsg}. Access will be restored after: ${formattedDate}.`;
                } catch (e) {
                    displayMessage = `Your account is suspended. Reason: ${reasonMsg}. Suspended until: ${untilDateStr}.`;
                }
            } else if (reasonMsg) {
                displayMessage = `Your account is suspended. Reason: ${reasonMsg}.`;
            }
        } else if (errorType) {
            displayMessage = `An error occurred. Please try again.`;
        }

        if (displayMessage) {
            
            const nextParams = new URLSearchParams(searchParams.toString());
            nextParams.delete('type');
            nextParams.delete('message');
            nextParams.delete('until');
            setSearchParams(nextParams, { replace: true });
            setMessage(displayMessage);
        }
    }, []);

    const background = useMemo(() => (
        <>
            <FloatingIconsBackground />
            <AnimatedGradientBackground />
            <ParticlesBackground />
        </>
    ), []);

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
        <div className="relative flex h-screen overflow-hidden"> 
            {/* Background animated icons */}
            <div className="absolute inset-0">
                {background}
            </div>

            {/* Main form */}
            { renderForm() }
        </div>
    )
}