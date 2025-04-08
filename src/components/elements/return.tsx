import { useEffect, useMemo, useState } from "react";
import { cn } from "../../libs/utils";
import { env } from "../../libs";
import { Link } from "react-router-dom"; 
import { FloatingIconsBackground } from "./floating-icon";
import { AnimatedGradientBackground } from "./gradient-background";
import { ParticlesBackground } from "./particle";

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

    const background = useMemo(() => (
        <>
            <FloatingIconsBackground />
            <AnimatedGradientBackground />
            <ParticlesBackground />
        </>
    ), []);

    return (
        <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden"> 
            <div className="absolute inset-0">
                {background}
            </div>

            <div className={cn(
                "relative flex flex-col justify-center items-center text-center bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg z-10",
                initAnimation 
                )}
                    style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
                    >

                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-5" >
                        FluffyNet
                    </h1>

                <p className="text-gray-600 text-lg mb-8 px-4">
                    {message}
                </p>

                <span className="cursor-pointer font-semibold hover:text-black text-gray-500 text-center text-bg font-semibold"> 
                    <Link
                        to="/login"
                    >
                        {buttonText}
                    </Link>
                    <span className="text-4xl opacity-50">🐾</span>
                </span>
            </div>
        </div>
    );
};