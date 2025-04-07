import { useEffect, useMemo, useState } from "react";
import { FloatingIconsBackground } from "../components/elements/floating-icon";
import { ResetPasswordForm } from "../components/authen/reset-password-form";
import { useSearchParams } from "react-router-dom";
import { Return } from "../components/elements/return";
import { ParticlesBackground } from "../components/elements/particle";
import { AnimatedGradientBackground } from "../components/elements/gradient-background";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const background = useMemo(() => (
        <>
            <FloatingIconsBackground />,
            <AnimatedGradientBackground />,
            <ParticlesBackground />
        </>
    ), []);

    if (!token) {
        return (
            <Return/>
        )
    }

    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('');
    }, [pwd])

    return (
        <div className="relative flex h-screen overflow-hidden"> 
            <div className="absolute inset-0">
                {background}
            </div>

            <ResetPasswordForm pwd={pwd} setPwd={setPwd} message={message} setMessage={setMessage} token={token} />
        </div>
    )
}
