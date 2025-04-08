import { useEffect, useState } from "react";
import { InputForm } from "../elements/input-form";
import { register } from "../../services/authen/register";
import { env } from "../../libs";
import { cn } from "../../libs/utils";
import axios from "axios";

interface RegisterFormProps {
    user: string;
    setUser: (value: string) => void;
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void; 
}

export const RegisterForm = ({ user, setUser, pwd, setPwd, message, setMessage, setState }: RegisterFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in'); 
    const [repwd, setRepwd] = useState('');
    const [animation, setAnimation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleRegister = async () => {
        setMessage("");
        try {
            if (!user || !pwd || !repwd) {
                throw new Error("Please fill in all fields!");
            }
            if (pwd !== repwd) {
                setRepwd("");
                throw new Error("Passwords do not match!");
            }

            setIsLoading(true);
            const username = user;
            const password = pwd;

            const registerWithTimeout = Promise.race([
                register(username, password),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout!")), 8000) 
                ),
            ]);

            await registerWithTimeout;
            setMessage("Registration successful! Please log in.")
            await new Promise(resolve => setTimeout(resolve, 1500));
            setPwd("");
            await navigateToLogin()
        } catch (error: any) { 
            let displayMessage = "An unknown error occurred during register."; 
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    displayMessage = "Too many register attempts. Please wait a minute and try again.";
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
        }
    };

    const handleGoogle = async () => {
        if (isLoading)
            setMessage('Currently login. Please wait a bit');
        try {
            const googleAuthUrl = `${env.be.url}/api/auth/google`;
            window.location.href = googleAuthUrl;
        } catch (error: any) { 
            let displayMessage = "An unknown error occurred during register."; 
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    displayMessage = "Too many register attempts. Please wait a minute and try again.";
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
        }
    };

    const navigateToLogin = async () => {
        setAnimation('animate-fade-out');
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000)); 
        setState('login');
        setMessage("");
        setPwd("");
    }

    return (
        <div className="flex flex-col justify-center lg:flex-row w-full min-h-screen items-center">
            <div className={cn(
                "w-full flex flex-col justify-center items-center p-4 lg:p-0", 
                animation,
                initAnimation 
            )}>  
                <div className="bg-white p-6 md:p-8 lg:p-10 w-full max-w-md lg:max-w-none lg:w-[30vw] rounded-t-3xl rounded-2xl shadow-lg z-10 flex flex-col">
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>
                    <p className="text-gray-500 text-center mb-6">
                        <span className="lg:hidden">Fill in the details below to sign up.</span>
                        <span className="hidden lg:inline">Step into a world of possibilities. Begin your journey.</span>
                    </p>

                    <div className="space-y-4">
                        <InputForm
                            name="username"
                            icon="mail"
                            placeholder="Username" 
                            className={'placeholder-gray-400'}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <InputForm
                            name="password"
                            icon="lock"
                            type='password'
                            placeholder="Password"
                            className={'placeholder-gray-400'}
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        <InputForm
                            name="re-password"
                            icon="lock_reset"
                            type='password'
                            placeholder="Confirm password"
                            className={'placeholder-gray-400'}
                            value={repwd}
                            onChange={(e) => setRepwd(e.target.value)}
                        />
                    </div>

                    <button
                        className={cn( 
                        "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200",
                        {"opacity-50 cursor-not-allowed": isLoading} 
                        )}
                        onClick={handleRegister}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Signing up..." : "Sign up"} 
                    </button>

                    {message && (
                        <p className={
                            `text-center mt-3 text-sm ${
                                (message.startsWith("Registration"))
                                    ? 'text-green-600' 
                                    : 'text-red-500'   
                            }`
                        }
                        >
                            {message}
                        </p>
                    )}

                    <div className="flex items-center my-5">
                        <hr className="flex-grow border-yellow-400" />
                        <span className="mx-4 text-yellow-500 text-sm">or</span>
                        <hr className="flex-grow border-yellow-400" />
                    </div>

                    <button
                        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-medium p-3 rounded-xl hover:bg-gray-50 hover:scale-102 active:scale-95 transition lg:bg-gray-100 lg:border-none lg:text-black lg:font-semibold lg:hover:bg-gray-200"
                        onClick={handleGoogle}
                    >
                        <img src="src\assets\img\google.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign up with Google 
                    </button>

                    <p className="text-gray-500 text-center mt-4 text-sm font-semibold">
                        Already have an account?{' '}
                        <span
                            className="font-semibold cursor-pointer hover:text-black"
                            onClick={navigateToLogin}
                        >
                            Back to sign in!
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}