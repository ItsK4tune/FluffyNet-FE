import { useCallback } from "react";

interface AvatarProps {
    user_id: number;
}

export const Avatar: React.FC<AvatarProps> = () => {
    const onClick = useCallback(() => {

    },[]);

    return (
        <div
            className="
                rounded-full
                hover: opacity-100
                transition
                cursor-pointer
                relative
                w-12 h-12
            "
        >
            <img 
                src={'src/assets/img/placeholder.png'} 
                alt="Avatar" 
                className="object-cover rounded-full"
                onClick={onClick}
            />
        </div>
    );
}