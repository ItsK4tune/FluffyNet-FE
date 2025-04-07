import { useState, useEffect, useRef, useMemo } from 'react';

interface IconPosition {
    id: number;
    src: string;
    top: number;
    left: number; 
    duration: number; 
    delay: number; 
}

const ICON_SIZE = 124;
const NUMBER_OF_ICONS = 20; 
const MAX_PLACEMENT_ATTEMPTS = 100; 

export const FloatingIconsBackground = () => {
    const [icons, setIcons] = useState<IconPosition[]>([]);
    const containerRef = useRef<HTMLDivElement>(null); 

    const availableImages = useMemo(() => [
        "src/assets/img/bell.png",
        "src/assets/img/comment.png",
        "src/assets/img/face.png",
        "src/assets/img/headphone.png",
        "src/assets/img/heart.png",
        "src/assets/img/music.png",
        "src/assets/img/thumbup.png"
    ], []);

    const checkOverlap = (rect1: DOMRect, rect2: DOMRect): boolean => {
        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    };

    useEffect(() => {
        if (!containerRef.current) return; 

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        if (containerWidth === 0 || containerHeight === 0)  return;

        const placedIcons: IconPosition[] = [];

        for (let i = 0; i < NUMBER_OF_ICONS; i++) {
            let attempts = 0;
            let placed = false;

            const randomImageSrc = availableImages[Math.floor(Math.random() * availableImages.length)];

            while (attempts < MAX_PLACEMENT_ATTEMPTS && !placed) {
                attempts++;

                const trialLeft = Math.random() * (containerWidth - ICON_SIZE);
                const trialTop = Math.random() * (containerHeight - ICON_SIZE);

                const newRect = {
                    top: trialTop,
                    left: trialLeft,
                    bottom: trialTop + ICON_SIZE,
                    right: trialLeft + ICON_SIZE,
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                } as DOMRect; 

                let isOverlapping = false;
                for (const existingIcon of placedIcons) {
                    const existingRect = {
                        top: existingIcon.top,
                        left: existingIcon.left,
                        bottom: existingIcon.top + ICON_SIZE,
                        right: existingIcon.left + ICON_SIZE,
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                    } as DOMRect;

                    if (checkOverlap(newRect, existingRect)) {
                        isOverlapping = true;
                        break; 
                    }
                }

                if (!isOverlapping) {
                    placedIcons.push({
                        id: i,
                        src: randomImageSrc,
                        top: trialTop,
                        left: trialLeft,
                        duration: 4 + Math.random() * 3, 
                        delay: Math.random() * 2, 
                    });
                    placed = true; 
                }
            } 
        } 

        setIcons(placedIcons); 
    }, [availableImages]); 

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none -z-5" 
            style={{ position: 'absolute' }} 
        >
            {icons.map((icon) => (
                <img
                    key={icon.id}
                    src={icon.src}
                    alt="Floating background icon"
                    className="absolute opacity-50 animate-floating"
                    style={{
                        position: 'absolute', 
                        top: `${icon.top}px`, 
                        left: `${icon.left}px`, 
                        width: `${ICON_SIZE}px`, 
                        height: `${ICON_SIZE}px`, 
                        animationDuration: `${icon.duration}s`,
                        animationDelay: `${icon.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};