// interface FloatingIconProps {
//     icon: string;
//     size: number;
//     top: string;
//     left: string;
// }

// export const FloatingIcon = ({ icon, size, top, left }: FloatingIconProps) => (
//     <span
//       className="absolute text-white opacity-20 animate-floating"
//       style={{ fontSize: size, top, left }}
//     >
//       <span className="material-icons">{icon}</span>
//     </span>
// );

export const FloatingIcons = () => {
    const icons = ["💬", "🎵", "❤️", "🔔", "👍", "😊"]; //Test purpose

    return (
        <div className="absolute inset-0 overflow-hidden">
            {icons.map((icon, index) => {
                const className = "absolute text-6xl opacity-30 animate-floating";
                console.log("Class được render:", className);

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
