import { useCallback } from "react";
import { Avatar } from "../elements/Avatar";

interface FriendItemProps {
    user_id: number;
    name: string;
    avatar: string;
    status: 'follow' | 'unfollow' | 'follow-back';
    onAction: (user_id: number) => void;
}

export const FriendItem: React.FC<FriendItemProps> = ({
    user_id,
    name,
    avatar,
    status,
    onAction
}) => {

    const handleClick = useCallback(() => {
        onAction(user_id);
    }, [user_id, onAction]);

    const renderButton = () => {
        if (status === 'follow') {
            return (
                <button
                    onClick={handleClick}
                    className="text-sm px-4 py-1 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
                >
                    Follow
                </button>
            );
        }

        if (status === 'follow-back') {
            return (
                <button
                    onClick={handleClick}
                    className="text-sm px-4 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                >
                    Follow back
                </button>
            );
        }

        return (
            <button
                onClick={handleClick}
                className="text-sm px-4 py-1 rounded-full border border-neutral-400 text-neutral-600 hover:bg-neutral-100 transition"
            >
                Unfollow
            </button>
        );
    };

    return (
        <div className="flex items-center justify-between py-3 px-5 hover:bg-neutral-100 transition">
            <div className="flex items-center gap-3">
                <Avatar user_id={user_id} />
                <span className="font-semibold text-sm">{name}</span>
            </div>
            {renderButton()}
        </div>
    );
};
