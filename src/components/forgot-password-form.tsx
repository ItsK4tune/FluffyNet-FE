import { useEffect, useState } from "react";
import { cn } from "../libs/utils"
import { InputForm } from "./elements/input-form"
import { env } from "../libs";
import { forgotPassword } from "../services/forgot-password";

interface ForgotPasswordFormProps {
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void;
}

export const ForgotPasswordForm = ({message, setMessage, setState} : ForgotPasswordFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [animation, setAnimation] = useState("");
    const [email, setEmail] = useState('');

    useEffect(() => {
        setMessage('');
    }, [email])

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation(""); 
        }, env.animate.fade * 1000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleForgot = async () => {
        try {
            if (!email) {
                throw new Error("Please fill in all fields!");
            }
            const emailAddress = email;
            const loginWithTimeout = Promise.race([
                forgotPassword(emailAddress),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout!")), 5000)
                ),
            ]);
            await loginWithTimeout;
            alert("Recovery email sent successfully. Please check your inbox.");
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                setMessage((error as any).response.data.message); 
            } else if (error instanceof Error && error.message) {
                setMessage(error.message);
            } else {
                setMessage("An unknown error occurred.");
            }
        }
    };

    const handleAnimation = async (newClass: string) => {
        setAnimation(newClass); 
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000 + 50)); 
        setAnimation(""); 
    };

    return (
        <div className={cn("w-1/1 flex flex-col justify-center items-center", animation, initAnimation)}>
            <h1 className="text-4xl font-bold text-black mb-8">FLUFFYNET</h1>

            <div className="bg-white p-10 rounded-2xl shadow-lg w-[30vw] z-10">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                <p className="text-gray-500 text-center mb-6">Enter your email to receive password reset instructions</p>

                <div className="space-y-4">
                    <InputForm 
                        name="forgot-password" 
                        icon="mail" 
                        placeholder="Email" 
                        className={'placeholder-gray-400'} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-4 hover:outline hover:outline-black active:scale-95 transition-transform" onClick={handleForgot}>
                    Send link
                </button>

                {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-yellow-400" />
                        <span className="mx-2 text-yellow-500">or</span>
                    <hr className="flex-grow border-yellow-400" />
                </div>

                <button 
                    className="w-full bg-gray-200 text-black p-3 rounded-xl mb-2 hover:outline hover:outline-black active:scale-95 transition-transform" 
                    onClick={async () => {await handleAnimation("animate-fade-out"), setState('login')}}
                >
                    Already have an account? Sign in
                </button>
                <button 
                    className="w-full bg-gray-100 text-black p-3 rounded-xl mb-2 hover:outline hover:outline-black active:scale-95 transition-transform" 
                    onClick={async () => {await handleAnimation("animate-fade-out"), setState('login')}}
                >
                    Don't have an account? Sign up
                </button>
            </div>  
        </div>
    )
}
