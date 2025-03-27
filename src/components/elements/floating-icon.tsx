const FloatingIcons = () => {
    const icons = ["💬", "🎵", "❤️", "🔔", "👍", "😊"]; //Test purpose

    return (
        <div className="absolute inset-0 overflow-hidden">
            {icons.map((icon, index) => {
                const className = "absolute text-6xl opacity-30 animate-floating";

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
                        {icon}
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