import { useEffect, useMemo, useState } from "react";
import { cn } from "../libs/utils";
import { env } from "../libs";
import { Link } from "react-router-dom"; 
import { FloatingIconsBackground } from "./elements/floating-icon";

const playfulMessages = [
    "Whoopsie-daisy! Looks like you took a fluffy detour. Let's find your way back! ☁️",
    "Lost in the pink clouds? No worries, just a little sparkle needed to get back on track! ✨",
    "Oh my! It seems the path dissolved into cotton candy. Let's teleport you! 🍭",
    "A mischievous breeze must've blown you here! Time to catch a friendly wind back! 🌬️",
    "Are you collecting sparkly things off the main path? 😉 Let's get you back to the stories!",
    "Looks like a path guarded by sleepy kittens! Let's tiptoe back to the entrance... 🐾",
    "This secret garden is lovely, but the login portal awaits! Follow the butterflies! 🦋",
    "Did you stumble upon a dream? Let's gently wake you up and head to login land! 💤",
];

const buttonTexts = [
    "Beam Me Back!",
    "Fluffy Escape!",
    "To the Login Cloud!",
    "Magic Portal!",
    "Follow the Sparkles!",
    "Teleport Home!",
    "Find My Way!",
];

export const Return = () => {
    const [initAnimation, setInitAnimation] = useState("animate-fade-in");
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        setMessage(playfulMessages[Math.floor(Math.random() * playfulMessages.length)]);
        setButtonText(buttonTexts[Math.floor(Math.random() * buttonTexts.length)]);

        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000 + 100); 

        return () => clearTimeout(timer);
    }, []);

    const floatingIconsMemo = useMemo(() => <FloatingIconsBackground />, []);

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-pink-100 p-4 relative">
            <div className="absolute inset-0">
                {floatingIconsMemo}
            </div>

            <div className={cn(
                "relative flex flex-col justify-center items-center text-center bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg z-10",
                initAnimation 
                )}
                    style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
                    >

                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-5" >
                        FluffyNet <span className="text-2xl align-middle">☁️</span>
                    </h1>

                <p className="text-gray-600 text-lg mb-8 px-4">
                    {message}
                </p>

                <Link
                     to="/login"
                    className={cn(
                        "px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-semibold rounded-full shadow-lg ",
                        "transition-all duration-300 ease-in-out",
                        "hover:shadow-xl hover:scale-105 hover:brightness-110",
                        "active:scale-95 active:brightness-95",
                        "z-10" 
                    )}
                >
                    ✨ {buttonText} ✨
                </Link>

                {/* Có thể thêm một hình ảnh nhỏ/icon vui nhộn */}
                <div className="mt-8 text-5xl opacity-50">🐾</div>
            </div>
        </div>
    );
};