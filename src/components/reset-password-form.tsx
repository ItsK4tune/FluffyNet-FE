import { useEffect, useState } from "react";
import { InputForm } from "./elements/input-form"
import { env } from "../libs";
import { cn } from "../libs/utils";
import { resetPassword } from "../services/reset-password/reset-password";

interface RegisterFormProps {
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    token: string;
}

export const ResetPasswordForm = ({pwd, setPwd, message, setMessage, token}: RegisterFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [repwd, setRepwd] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation(""); 
        }, env.animate.fade * 1000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleResetPassword = async () => {
        try {
            if (!pwd || !repwd) {
                throw new Error("Please fill in all fields!");
            }
            if (pwd !== repwd) {
                throw new Error("Password does not match!");
            }
            const response = await resetPassword(pwd, token);
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
    }

    const redirect = () => {
        window.location.href = "/login";
    }

    return (
        <div className={cn("w-1/1 flex flex-col justify-center items-center", initAnimation)}>
            <h1 className="text-4xl font-bold text-black mb-8">FLUFFYNET</h1>

            <div className="bg-white p-10 rounded-2xl shadow-lg w-[30vw] z-10">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <p className="text-gray-500 text-center mb-6">Enter your new password, sit back, and watch the magic happen.</p>

                <div className="space-y-4">
                    <InputForm 
                        name="password"
                        icon="lock" 
                        type='password' 
                        placeholder="New password" 
                        className={'placeholder-gray-400'} 
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <InputForm 
                        name="re-password"
                        icon="enhanced_encryption" 
                        type='password' 
                        placeholder="Retype new password" 
                        className={'placeholder-gray-400'} 
                        value={repwd}
                        onChange={(e) => setRepwd(e.target.value)}
                    />
                </div>

                {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                <button className="w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-4 hover:outline hover:outline-black active:scale-95 transition-transform" onClick={handleResetPassword}>
                    Reset password
                </button>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-yellow-400" />
                        <span className="mx-2 text-yellow-500">or</span>
                    <hr className="flex-grow border-yellow-400" />
                </div>

                <button 
                    className="w-full bg-gray-200 text-black p-3 rounded-xl mb-2 hover:outline hover:outline-black active:scale-95 transition-transform" 
                    onClick={redirect}
                >
                    Remember your password? Sign in
                </button>
            </div>  
        </div>
    )
}
