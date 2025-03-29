import { useEffect, useMemo, useState } from "react";
import { FloatingIconsBackground } from "../components/elements/floating-icon";
import { ResetPasswordForm } from "../components/reset-password-form";
import { useSearchParams } from "react-router-dom";
import { Return } from "../components/return";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    if (!token) {
        return (
            <div className="flex h-screen bg-pink-100">
                <div className="absolute inset-0">
                    {floatingIconsMemo}
                </div>
                
                <Return/>
            </div>
        )
    }

    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('');
    }, [pwd])

    return (
        <div className="flex h-screen bg-pink-100">
            {/* Background animated icons */}
            <div className="absolute inset-0">
                {floatingIconsMemo}
            </div>

            {/* Main form */}
            <ResetPasswordForm pwd={pwd} setPwd={setPwd} message={message} setMessage={setMessage} token={token} />
        </div>
    )
}
