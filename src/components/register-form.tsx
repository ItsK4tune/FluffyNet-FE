import { useEffect, useState } from "react";
import { InputForm } from "./elements/input-form"
import { register } from "../services/register";
import { env } from "../libs";
import { cn } from "../libs/utils";
import { google } from "../services/google";

interface RegisterFormProps {
    user: string;
    setUser: (value: string) => void;
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    setState: (value: string) => void;
}

export const RegisterForm = ({user, setUser, pwd, setPwd, message, setMessage, setState}: RegisterFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [repwd, setRepwd] = useState('');
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation(""); 
        }, env.animate.fade * 1000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleRegister = async () => {
        try {
            if (!user || !pwd || !repwd) {
                throw new Error("Please fill in all fields!");
            }
            if (pwd !== repwd) {
                throw new Error("Password does not match!");
            }
            const username = user;
            const password = pwd;
            const loginWithTimeout = Promise.race([
                register(username, password),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timeout!")), 5000)
                ),
            ]);
            await loginWithTimeout;
            alert("Register successful");
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
            await google();
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
                <h2 className="text-2xl font-bold text-center">Create Account</h2>
                <p className="text-gray-500 text-center mb-6">Fill your account detail</p>

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
                    <InputForm 
                        name="re-password"
                        icon="enhanced_encryption" 
                        type='password' 
                        placeholder="Retype password" 
                        className={'placeholder-gray-400'} 
                        value={repwd}
                        onChange={(e) => setRepwd(e.target.value)}
                    />
                </div>

                <button className="w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-4 hover:outline hover:outline-black active:scale-95 transition-transform" onClick={handleRegister}>
                    Sign up
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
                    className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-xl shadow hover:outline hover:outline-black active:scale-95 transition-transform"
                    onClick={handleGoogle}
                >
                    <img src="src\assets\img\google.png" alt="Google" className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>
            </div>  
        </div>
    )
}
