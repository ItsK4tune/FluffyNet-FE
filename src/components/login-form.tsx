import { useEffect, useState } from "react";
import { login } from "../services/login/login";
import { InputForm } from "./elements/input-form"
import { cn } from "../libs/utils";
import { env } from "../libs";
import { google } from "../services/login/google";

interface LoginFormProps {
    user: string;
    setUser: (value: string) => void;
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void;
}

export const LoginForm = ({user, setUser, pwd, setPwd, message, setMessage, setState} : LoginFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [sloganAnimation, setSloganAnimation] = useState("");
    const [formAnimation, setFormAnimation] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation(""); 
        }, env.animate.fade * 1000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleLogin = async () => {
        try {
            if (!user || !pwd) {
                throw new Error("Please fill in all fields!");
            }
            if (localStorage.getItem(`jwt:${user}`)) {
                throw new Error("You are already logged in!");
            }

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
            } else {
                throw new Error("Token not found in response.");
            }
            alert((response as { data?: { message?: string } }).data?.message);
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

    const handleGoogle = async () => {
        try {
            google();
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

    const handleAnimation = async (newClass1: string, newClass2: string) => {
        setSloganAnimation(newClass1); 
        setFormAnimation(newClass2); 
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000)); 
        setSloganAnimation(""); 
        setFormAnimation(""); 
    };

    return (
        <>
            {/*Slogan side*/}
            <div className={cn("w-2/5 flex flex-col justify-center items-center", sloganAnimation, initAnimation)}>
                <h1 className="text-4xl font-bold text-black">FLUFFYNET</h1>
                <p className="text-lg text-gray-600">Your world, your stories</p>
            </div>

            {/*Login side*/}
            <div className={cn("w-3/5 flex justify-center items-center", formAnimation, initAnimation)}>
                <div className="bg-white p-10 rounded-2xl shadow-lg w-[30vw] z-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center">Welcome back</h2>
                    <p className="text-gray-500 text-center mb-6">Access your personalized space by logging in below</p>

                    <div className="space-y-4">
                        <InputForm 
                            name="username" 
                            icon="mail" 
                            placeholder="Email or username" 
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
                    </div>

                    <button className="w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-4 hover:outline hover:outline-black active:scale-95 transition-transform duration-400 hover:scale-102" onClick={() => handleLogin()}>
                        Sign in
                    </button>
                
                    <p className="text-yellow-500 text-center mt-2 text-sm cursor-pointer" onClick={async () => {await handleAnimation("animate-fade-out", "animate-float-left"), setState('forgot')}}>
                        Forgot your password? Click me
                    </p>

                    {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-yellow-400" />
                            <span className="mx-2 text-yellow-500">or</span>
                        <hr className="flex-grow border-yellow-400" />
                    </div>

                    <button 
                        className="w-full bg-gray-200 text-black p-3 rounded-xl mb-2 hover:outline hover:outline-black active:scale-95 transition-transform duration-400 hover:scale-102"
                        onClick={async () => {await handleAnimation("animate-fade-out", "animate-float-left"), setState('register'), setMessage("")}}
                    >
                        Don't have an account? Sign up
                    </button>
                    
                    <button 
                        className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-xl hover:outline hover:outline-black active:scale-95 transition-transform duration-400 hover:scale-102"
                        onClick={handleGoogle}
                    >
                        <img src="src\assets\img\google.png" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>  
            </div>
        </>
    )
}