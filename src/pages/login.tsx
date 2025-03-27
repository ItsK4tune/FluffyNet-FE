import { FloatingIcons } from "../components/elements/floating-icon"
import { InputForm } from "../components/elements/input-form"
import BaseButton from "../components/elements/button.tsx";
import button from "../components/elements/button.tsx";

export const Login = () => {
    return (
        <div className="flex h-screen">
            {/* Background animated icons */}
            <div className="absolute inset-0">
                {Array.from({ length: 10 }).map((_, i) => (
                    <FloatingIcons key={i} />
                ))}
            </div>

            {/*Slogan side*/}
            <div className="w-2/5 flex flex-col justify-center items-center bg-pink-100">
                <h1 className="text-4xl font-bold text-black">FLUFFYNET</h1>
                <p className="text-lg text-gray-600">Your world, your stories</p>
            </div>

            {/*Login side*/}
            <div className="w-3/5 flex justify-center items-center bg-pink-100">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-[600px] z-10">
                    <h2 className="text-2xl font-bold text-center">Welcome back</h2>
                    <p className="text-gray-500 text-center mb-6">Log in with your account</p>

                    <div className="space-y-4">
                        <InputForm icon="mail" placeholder="Email or username" className={'placeholder-gray-400'}/>
                        <InputForm icon="lock" type="password" placeholder="Password" className={'placeholder-gray-400'}/>
                    </div>

                    <BaseButton
                        type={button}
                        method={'post'}
                        url={'localhost:3000/api/login'}
                        className="w-full bg-pink-300 text-black font-semibold p-3 rounded-xl mt-4">
                        Sign in
                    </BaseButton>

                    <p className="text-yellow-500 text-center mt-2 text-sm cursor-pointer">
                        Forgot your password
                    </p>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-yellow-400" />
                        <span className="mx-2 text-yellow-500">or</span>
                        <hr className="flex-grow border-yellow-400" />
                    </div>

                    <BaseButton
                        type={button}
                        // onClick={}  // navigate to register page
                        className="w-full bg-gray-100 text-black p-3 rounded-xl mb-2">
                        Create an account
                    </BaseButton>
                    <button className="w-full flex items-center justify-center bg-white border p-3 rounded-xl shadow">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}