import { useEffect, useState } from "react";
import { login } from "../services/login/login";
import { InputForm } from "./elements/input-form"; // Assuming this is responsive or styles adapt
import { cn } from "../libs/utils";
import { env } from "../libs";
import { google } from "../services/login/google";
import { useNavigate } from 'react-router-dom';

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
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("jwt:")) {
                navigate('/');
            }
        });
    }, []);

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
            const response = await loginWithTimeout;
            const token = (response as { data?: { token?: string } }).data?.token;
            if (token) {
                Object.keys(localStorage).forEach((key) => {
                    if (key.startsWith("jwt:")) {
                        localStorage.removeItem(key);
                    }
                });
                localStorage.setItem(`jwt:${user}`, token); 
                setMessage((response as { data?: { message?: string } }).data?.message || "Login Successful!");
                await new Promise(resolve => setTimeout(resolve, 1500));
                await handleAnimation("animate-fade-out", "animate-fade-out");
                navigate('/');
            } else {
                throw new Error("Login failed. Token not received."); 
            }
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                setMessage((error as any).response.data.message);
            } else if (error instanceof Error && error.message) {
                setMessage(error.message);
            } else {
                setMessage("An unknown error occurred during login.");
            }
            setIsLoading(false);
        }
    };

    const handleGoogle = async () => {
        if (isLoading)
            setMessage('Currently login. Please wait a bit');
        try {
            google();
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                setMessage((error as any).response.data.message);
            } else if (error instanceof Error && error.message) {
                setMessage(error.message);
            } else {
                setMessage("An unknown error occurred with Google Sign-in.");
            }
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
                {/* Form Card */}
                <div className="bg-white p-6 md:p-8 lg:p-10 w-full max-w-md lg:max-w-none lg:w-[30vw] rounded-t-3xl lg:rounded-2xl shadow-lg z-10 flex flex-col">
                    <h2 className="text-2xl font-bold text-center">Welcome back</h2>
                    
                    <p className="text-gray-500 text-center mb-6">
                        <span className="lg:hidden">Log in with your account</span>
                        <span className="hidden lg:inline">Access your personalized space by logging in below</span>
                    </p>

                    <div className="space-y-4">
                        <InputForm
                            name="username" 
                            icon="mail"     
                            placeholder="username or email" 
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
                        "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200 lg:hover:outline lg:hover:outline-black ",
                        {"opacity-50 cursor-not-allowed": isLoading} 
                        )}
                        onClick={handleLogin}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Signing in..." : "Sign in"} 
                    </button>

                    <p
                        className="text-yellow-500 text-center mt-4 text-sm cursor-pointer font-semibold" 
                        onClick={navigateToForgot} 
                    >
                        Forgot your password 
                    </p>

                    {message && (
                        <p className={
                            `text-center mt-3 text-sm ${
                                (message.startsWith("Login successfully") || message.startsWith("Login Successful!"))
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
                        className="w-full bg-white border border-gray-300 text-gray-800 font-medium p-3 rounded-xl mb-3 hover:bg-gray-50 hover:scale-102 active:scale-95 transition lg:bg-gray-200 lg:border-none lg:text-black lg:font-semibold lg:hover:outline lg:hover:outline-black lg:hover:bg-gray-200" 
                        onClick={navigateToRegister}
                    >
                        <span>Don't have an account? Sign up</span>
                    </button>

                    <button
                        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 font-medium p-3 rounded-xl hover:bg-gray-50 hover:scale-102 active:scale-95 transition lg:bg-gray-100 lg:border-none lg:text-black lg:font-semibold lg:hover:outline lg:hover:outline-black lg:hover:bg-gray-100 lg:hover:scale-102" 
                        onClick={handleGoogle}
                    >
                        <img src="src\assets\img\google.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}