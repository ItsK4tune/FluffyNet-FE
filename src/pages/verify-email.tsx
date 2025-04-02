import { useEffect, useMemo, useState } from "react";
import { FloatingIconsBackground } from "../components/elements/floating-icon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Return } from "../components/elements/return";
import { cn } from "../libs/utils";
import { env } from "../libs";
import { verifyEmail } from "../services/authen/verify";

export const VerifyEmail = () => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [animation, setAnimation] = useState("");

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    if (!token) {
        return (
            <Return/>
        )
    }

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, [token]);

    useEffect(() => {
        const runVerify = async (token: string) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 5000));
                await verifyEmail(token)
            } catch {
                // TODO: add later
            } finally {
                setAnimation('animate-fade-out');
                await new Promise(resolve => setTimeout(resolve, 1500));
                navigate('/');
            }
        }

        runVerify(token);
    }, [token]);

    return (
        <div className="flex h-screen bg-pink-100">
            <div className="absolute inset-0">
                {floatingIconsMemo}
            </div>

            <div className="flex flex-col justify-center lg:flex-row lg:justify-start w-full min-h-screen items-center">
                <div className={cn(
                    "hidden lg:flex w-full lg:w-2/5 flex-col justify-center items-center p-8",
                    initAnimation,
                    animation,
                )}>
                    <h1 className="text-4xl font-bold text-black">FLUFFYNET</h1>
                    <p className="text-lg text-gray-600">Your world, your stories</p>
                </div>
    
                <div className={cn(
                    "w-full lg:w-3/5 flex flex-col justify-center items-center p-4 lg:p-0",
                    initAnimation,
                    animation,
                )}>
                    <div className="bg-white p-6 md:p-8 lg:p-10 w-full max-w-md lg:max-w-none lg:w-[30vw] rounded-t-3xl lg:rounded-2xl shadow-lg z-10 flex flex-col">
                        <h2 className="text-2xl font-bold text-left lg:text-center">Redirecting...!</h2>
                        <p className="text-gray-500 text-left lg:text-center mb-6">
                            <span className="inline">Please wait while we redirect you. This may take a moment.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
