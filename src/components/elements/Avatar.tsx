import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
    user_id: number;
}

export const Avatar: React.FC<AvatarProps> = ({ user_id }) => {
    const navigate = useNavigate();

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `user/${user_id}`;
        
        navigate(url);
    },[navigate, user_id]);

    return (
        <div
            className="
                rounded-full
                hover: opacity-100
                transition
                cursor-pointer
                relative
                w-10 h-10
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