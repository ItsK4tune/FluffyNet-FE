import { useCallback, useMemo } from 'react';
import Particles from "react-tsparticles";
import type { Container, Engine, MoveDirection, OutMode } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const particleColors = ["#FFC0CB", "#FFFFFF", "#FFFACD", "#FFB6C1", "#FFE4E1"];

export const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log("tsParticles container loaded", container);
    }, []);

    const particleOptions = useMemo(() => ({
        background: {
            opacity: 0, 
        },
        fpsLimit: 60, 
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push", 
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 1, 
                },
            },
        },
        particles: {
            color: {
                value: particleColors, 
            },
            links: { 
                color: "#ffffff",
                distance: 100,
                enable: true, 
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none" as MoveDirection, 
                enable: true,
                outModes: { 
                    default: "out" as OutMode,
                },
                random: true, 
                speed: 1, 
                straight: false, 
            },
            number: {
                density: {
                    enable: true,
                    area: 100, 
                },
                value: 30, 
            },
            opacity: {
                value: {min: 0.3, max: 0.8}, 
                animation: { 
                    enable: true,
                    speed: 1,
                    minimumValue: 0.2,
                    sync: false,
                },
            },
            shape: {
                type: "circle", 
            },
            size: {
                value: { min: 1, max: 4 }, 
                animation: { 
                    enable: true,
                    speed: 2,
                    minimumValue: 1,
                    sync: false,
                },
            },
        },
        detectRetina: true,
    }), []); 


    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particleOptions}
            className="absolute inset-0 -z-10"
        />
    );
};