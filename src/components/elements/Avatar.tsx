import { useCallback } from "react";

interface AvataProps {
    user_id: number;
}

const Avatar: React.FC<AvataProps> = ({ user_id }) => {
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
                src={'/images/placeholder.png'} 
                alt="Avatar" 
                className="object-cover rounded-full"
                onClick={onClick}
            />
        </div>
    );
}

export default Avatar;