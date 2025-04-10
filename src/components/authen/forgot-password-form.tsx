import { useEffect, useState } from "react";
import { cn } from "../../libs/utils";
import { InputForm } from "../elements/input-form";
import { env } from "../../libs";
import { forgotPassword } from "../../services/authen/forgot-password";
import axios from "axios";

interface ForgotPasswordFormProps {
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void; 
}

export const ForgotPasswordForm = ({message, setMessage, setState} : ForgotPasswordFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [animation, setAnimation] = useState("");
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        setMessage('');
    }, [email, setMessage]); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleForgot = async () => {
        setMessage("");
        try {
            if (!email) {
                throw new Error("Please fill in the email field!"); 
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                throw new Error("Please enter a valid email address.");
            }

            setIsLoading(true);
            const emailAddress = email;
            await Promise.race([
                forgotPassword(emailAddress),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout!")), 8000)
                ),
            ]);
            setMessage("A password reset link has been sent.");
        } catch (error: any) { 
            let displayMessage = "An unknown error occurred."; 
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    displayMessage = "Too many attempts. Please wait a minute and try again.";
                }
                else if (error.response?.data?.message) {
                    displayMessage = error.response.data.message;
                }
                else if (error.message) {
                    displayMessage = error.message;
                }
            }
            else if (error instanceof Error && error.message) {
                displayMessage = error.message;
            }
        
            setMessage(displayMessage); 
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToLogin = async () => {
        setAnimation('animate-fade-out');
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000)); 
        setState('login');
    }

    return (
        <div className="flex flex-col justify-center lg:flex-row lg:justify-start w-full min-h-screen items-center">
            <div className={cn(
                "w-full flex flex-col justify-center items-center p-4 lg:p-0",
                animation, 
                initAnimation 
            )}>
                <div className="bg-white p-6 md:p-8 lg:p-10 w-full max-w-md lg:max-w-none lg:w-[30vw] rounded-t-3xl rounded-2xl shadow-lg z-10 flex flex-col">
                    <h2 className="text-2xl font-bold text-center">Forgot Password?</h2> 
                    <p className="text-gray-500 text-center mb-6"> 
                        <span className="lg:hidden">Enter your email to get a reset link.</span>
                        <span className="hidden lg:inline">No worries! Enter your email below and we'll send you a link to reset it.</span>
                    </p>

                    <div className="space-y-4">
                        <InputForm
                        name="forgot-email" 
                        icon="mail"
                        type="email" 
                        placeholder="Email"
                        className={'placeholder-gray-400'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={
                            `text-center mt-3 text-sm ${
                                (message.startsWith("A password reset link has been sent."))
                                    ? 'text-green-600' 
                                    : 'text-red-500'   
                            }`
                        }
                        >
                            {message}
                        </p>
                    )}

                    <button
                        className={cn( 
                        "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200",
                        {"opacity-50 cursor-not-allowed": isLoading} 
                        )}
                        onClick={handleForgot}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"} 
                    </button>

                    <div className="flex items-center my-5">
                        <hr className="flex-grow border-yellow-400" />
                        <span className="mx-4 text-yellow-500 text-sm">or</span>
                        <hr className="flex-grow border-yellow-400" />
                    </div>

                    <p className="text-gray-500 text-center mt-2 text-sm font-semibold">
                        Remember your password?{' '}
                        <span
                            className="font-semibold cursor-pointer hover:text-black"
                            onClick={navigateToLogin}
                        >
                            Back to sign in.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}