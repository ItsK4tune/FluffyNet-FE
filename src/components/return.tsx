import { useEffect, useState } from "react";
import { cn } from "../libs/utils";
import { env } from "../libs";

export const Return = () => {
    const [initAnimation, setInitAnimation] = useState("animate-fade-in");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitAnimation("");
        }, env.animate.fade * 1000);

        return () => clearTimeout(timer);
    }, []);

    const getRandomMessage = () => {
        const messages = [
            "Oops, you seem lost! But hey, no worries—press this button and let the magic happen!",
            "Ah, a brave soul! Click this button and embark on a journey to clarity!",
            "Lost in the digital jungle? Fear not, this button is your compass!",
            "Well, aren't you a curious one? Hit this button and see where it takes you!",
            "Feeling stuck? This button is your ticket to freedom—click it!",
            "Oh no, trapped again? Don't panic, just press this button and escape!",
            "Hey there, explorer! This button is your shortcut to the next adventure!",
            "Confused? Don't be! This button is your guide to the promised land!",
            "Lost in translation? This button speaks the universal language of escape!",
            "Stuck in a loop? Break free with a single click of this magical button!",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    useEffect(() => {
        setMessage(getRandomMessage());
    }, []);

    const redirect = () => {
        window.location.href = "/login";
    }

    return (
        <div className={cn("w-1/1 flex flex-col justify-center items-center", initAnimation)}>
            <h1 
                className="text-4xl font-bold text-black mb-8 duration-300 hover:text-blue-500 hover:scale-110 z-10" 
            >
                FLUFFYNET
            </h1>

            <h2 className="text-4xl text-gray-800 mb-8 w-[50vw] text-center duration-300 hover:text-blue-500 hover:scale-110 z-10">
                {message}
            </h2>

            <button
                onClick={redirect}
                className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 z-10"
            >
                Tunnel to the login page
            </button>

            <div className="flex gap-4 mt-6">
                <span className="text-4xl animate-bounce">🎉</span>
                <span className="text-4xl animate-bounce">🔥</span>
            </div>
        </div>
    );
};
