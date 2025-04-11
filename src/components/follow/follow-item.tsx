import { useCallback } from "react";
import { Avatar } from "../elements/avatar";

interface FollowItemProps {
    user_id: number;
    name: string;
    avatar: string;
    status: 'follow' | 'unfollow' | 'follow-back';
    onAction: (user_id: number) => void;
}

export const FollowItem: React.FC<FollowItemProps> = ({
    user_id,
    name,
    // avatar,
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
                    className="text-sm px-4 py-1 rounded-full bg-rose-200 text-gray-700 hover:bg-rose-100 transition cursor-pointer"
                >
                    Follow
                </button>
            );
        }

        if (status === 'follow-back') {
            return (
                <button
                    onClick={handleClick}
                    className="text-base px-4 py-1 rounded-full bg-rose-200 text-gray-700 hover:bg-rose-100 transition cursor-pointer"
                >
                    Follow back
                </button>
            );
        }

        return (
            <button
                onClick={handleClick}
                className="text-sm px-4 py-1 rounded-full border border-neutral-400 text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
            >
                Unfollow
            </button>
        );
    };

    return (
        <div className="border-b border-neutral-200 last:border-b-0 flex items-center justify-between py-3 px-5 transition">
            <div className="flex items-center gap-3">
                <Avatar user_id={user_id} />
                <span className="font-semibold text-sm">{name}</span>
            </div>
            {renderButton()}
        </div>
    );
};
