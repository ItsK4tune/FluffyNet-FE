import { ReactNode, MouseEvent } from "react";

interface BaseButtonProps {
    className?: string;
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    method?: string;
    url?: string;
    [key: string]: any;
}

const BaseButton = ({
                        className = "",
                        children,
                        type = "button",
                        onClick,
                        method,
                        url,
                        ...props
}: BaseButtonProps) => {

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }
        if (url && method) {
            try {
                const response = await fetch(url, { method: method.toUpperCase() });
                console.log("Response:", await response.json());
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <button type={type} className={className} onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

export default BaseButton;


