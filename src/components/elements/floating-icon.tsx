const FloatingIcons = () => {
    const images = ["src/assets/img/bell.png", "src/assets/img/comment.png", "src/assets/img/face.png", "src/assets/img/headphone.png", "src/assets/img/heart.png", "src/assets/img/music.png", "src/assets/img/thumbup.png"]; //Test purpose

    return (
        <div className="absolute inset-0 overflow-hidden">
            {images.map((image, index) => {
                const className = "absolute text-6xl opacity-50 animate-floating";
                
                return (
                    <span
                        key={index}
                        className={className}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${4 + Math.random() * 3}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        <img src={image} alt="bg-image" />
                    </span>
                );
            })}
        </div>
    );
};


export const FloatingIconsBackground = () => {
    return (
        <div className="absolute inset-0">
            {Array.from({ length: 10 }).map((_, i) => (
                <FloatingIcons key={i} />
            ))}
        </div>
    );
};