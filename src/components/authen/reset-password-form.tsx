import { useEffect, useState } from "react";
import { InputForm } from "../elements/input-form";
import { env } from "../../libs";
import { cn } from "../../libs/utils";
import { resetPassword } from "../../services/authen/reset-password";
import { useNavigate } from "react-router-dom";

interface ResetPasswordFormProps {
    pwd: string;
    setPwd: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    token: string;  
}

export const ResetPasswordForm = ({ pwd, setPwd, message, setMessage, token }: ResetPasswordFormProps) => {
    const [initAnimation, setInitAnimation] = useState('animate-fade-in');
    const [repwd, setRepwd] = useState('');
    const [animation, setAnimation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, [token]);

    const handleResetPassword = async () => {
        setMessage(""); 
        try {
            if (!pwd || !repwd) {
                throw new Error("Please fill in all fields!");
            }
            if (pwd !== repwd) {
                setRepwd(""); 
                throw new Error("Passwords do not match!");
            }

            setIsLoading(true);
            await resetPassword(pwd, token);
            setMessage("Password reset successfully!");
            await new Promise(resolve => setTimeout(resolve, 1500));
            await navigateToLogin();
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                setMessage((error as any).response.data.message);
            } else if (error instanceof Error && error.message) {
                setMessage(error.message);
            } else {
                setMessage("An unknown error occurred while resetting the password.");
            }
            setIsLoading(false);
        }
    }

    const navigateToLogin = async () => {
        setAnimation('animate-fade-out');
        await new Promise(resolve => setTimeout(resolve, env.animate.fade * 1000)); 
        navigate('/login');
    }

    return (
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
                    <h2 className="text-2xl font-bold text-left lg:text-center">Reset Password</h2>
                    <p className="text-gray-500 text-left lg:text-center mb-6">
                        <span className="lg:hidden">Enter and confirm your new password.</span>
                        <span className="hidden lg:inline">Enter your new password below. Make sure it's secure!</span>
                    </p>

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
                            icon="lock_reset" 
                            type='password'
                            placeholder="Confirm new password"
                            className={'placeholder-gray-400'}
                            value={repwd}
                            onChange={(e) => setRepwd(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={
                            `text-center mt-3 text-sm ${
                                (message.startsWith("Password reset successfully!"))
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
                        "w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-6 hover:bg-pink-400 hover:scale-102 active:scale-95 transition-transform duration-200 lg:hover:outline lg:hover:outline-black ",
                        {"opacity-50 cursor-not-allowed": isLoading} 
                        )}
                        onClick={handleResetPassword}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Resetting..." : "Reset password"} 
                    </button>

                    <div className="flex items-center my-5">
                        <hr className="flex-grow border-yellow-400" />
                        <span className="mx-4 text-yellow-500 text-sm">or</span>
                        <hr className="flex-grow border-yellow-400" />
                    </div>

                    <button
                        className="w-full bg-white border border-gray-300 text-gray-800 font-medium p-3 rounded-xl hover:bg-gray-50 hover:scale-102 active:scale-95 transition lg:bg-gray-200 lg:border-none lg:text-black lg:font-semibold lg:hover:outline lg:hover:outline-black lg:hover:bg-gray-200 lg:hover:scale-102"
                        onClick={navigateToLogin}
                    >
                        Remember your password? Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}