import { useEffect, useState } from "react";
import { login } from "../../services/authen/login";
import { InputForm } from "../elements/input-form";
import { cn } from "../../libs/utils";
import { env } from "../../libs";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface LoginFormProps {
    user: string;
    setUser: (value: string) => void;
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void;
}

export const LoginForm = ({ user, setUser, pwd, setPwd, message, setMessage, setState }: LoginFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [sloganAnimation, setSloganAnimation] = useState("");
    const [formAnimation, setFormAnimation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async () => {
        setMessage("");
        try {
            if (!user || !pwd) {
                throw new Error("Please fill in all fields!");
            }

            setIsLoading(true);
            const username = user;
            const password = pwd;
            const loginWithTimeout = Promise.race([
                login(username, password),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout!")), 5000)
                ),
            ]);
            await loginWithTimeout;
            setMessage("Login Successful!");
            await new Promise(resolve => setTimeout(resolve, 1500));
            await handleAnimation("animate-fade-out", "animate-fade-out");
            navigate('/');
        } catch (error: any) { 
            let displayMessage = "An unknown error occurred during login."; 
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    displayMessage = "Too many login attempts. Please wait a minute and try again.";
                }
                if (error.response?.status === 403) {
                    if (error.response?.data?.reason && error.response?.data?.until) { 
                        if (!error.response?.data?.reason) {
                            displayMessage = 'Your account is suspended.';
                        } else {
                            displayMessage = `Your account is suspended. Reason: ${error.response.data.reason}. Suspended until: ${error.response.data.until}.`;
                        }
                    } else if (error.message) {
                        displayMessage = `You have been banned. Reason: ${error.response.data.message}.`;
                    } else {
                        displayMessage = 'You have been banned.';
                    }
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
            let displayMessage = "An unknown error occurred during login."; 
        
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    displayMessage = "Too many login attempts. Please wait a minute and try again.";
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

    const handleAnimation = async (newClass1: string, newClass2: string) => {
        setSloganAnimation(newClass1);
        setFormAnimation(newClass2);
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000));
    };

    const navigateToRegister = async () => {
        if (window.innerWidth >= 1024) { 
            await handleAnimation("animate-fade-out", "animate-float-left");
        }
        else    await handleAnimation("animate-fade-out", "animate-fade-out");
        setState('register');
        setMessage("");
        setUser("");
        setPwd("");
    }

    const navigateToForgot = async () => {
        if (window.innerWidth >= 1024) {
            await handleAnimation("animate-fade-out", "animate-float-left");
        }
        else    await handleAnimation("animate-fade-out", "animate-fade-out");
        setState('forgot');
        setMessage("");
    }

    return (
        <div className="flex flex-col justify-center lg:flex-row w-full min-h-screen items-center">
            <div className={cn(
                "flex w-full lg:w-2/5 flex-col justify-center items-center p-8", 
                sloganAnimation,
                initAnimation 
            )}>
                <h1 className="text-4xl font-bold text-black">FLUFFYNET</h1>
                <p className="text-lg text-gray-600">Your world, your stories</p>
            </div>

            <div className={cn(
                "w-full lg:w-3/5 flex flex-col justify-center items-center p-4 lg:p-0", 
                formAnimation,
                initAnimation
            )}>
                <div className="bg-white p-6 md:p-8 lg:p-10 w-full max-w-md lg:max-w-none lg:w-[30vw] rounded-t-3xl rounded-2xl shadow-lg z-10 flex flex-col">
                    <h2 className="text-2xl font-bold text-center">Welcome back</h2>
                    
                    <p className="text-gray-500 text-center mb-6">
                        <span className="lg:hidden">Log in with your account</span>
                        <span className="hidden lg:inline">Access your personalized space by logging in below</span>
                    </p>

                    <div className="space-y-4">
                        <InputForm
                            name="username" 
                            icon="mail"     
                            placeholder="Username or email" 
                            className='placeholder-gray-400' 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <InputForm
                            name="password"
                            icon="lock"
                            type='password'
                            placeholder="Password"
                            className='placeholder-gray-400'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>

                    <button
                        className={cn( 
                        "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200",
                        {"opacity-50 cursor-not-allowed": isLoading} 
                        )}
                        onClick={handleLogin}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Signing in..." : "Sign in"} 
                    </button>
                   
                    <span 
                        onClick={navigateToForgot}
                        className="cursor-pointer font-semibold hover:text-yellow-600 text-yellow-500 text-center mt-4 text-sm font-semibold"
                    >
                        Forgot your password?
                    </span>

                    {message && (
                        <p className={
                            `text-center mt-3 text-sm ${
                                (message.startsWith("Login Successful!"))
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
                        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-medium p-3 rounded-xl hover:bg-gray-50 hover:scale-102 active:scale-95 transition lg:bg-gray-100 lg:border-none lg:text-black lg:font-semibold lg:hover:bg-gray-200 lg:hover:scale-102" 
                        onClick={handleGoogle}
                    >
                        <img src="src\assets\img\google.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>

                    <p className="text-gray-500 text-center mt-4 text-sm font-semibold">
                        Don't have an account?{' '}
                        <span
                            className="font-semibold cursor-pointer hover:text-black"
                            onClick={navigateToRegister}
                        >
                            Sign up here!
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}