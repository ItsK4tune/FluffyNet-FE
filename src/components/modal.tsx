import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./elements/button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
}) => {
    const handleClose = useCallback(() => {
        if (disabled) return;

        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    overflow-y-auto
                    overflow-x-hidden
                  bg-white/60
                    outline-none
                    focus:outline-none
                "
            >
                <div
                    className="
                        relative
                        my-6
                        mx-auto
                        h-full
                        w-full
                        lg:h-auto
                        lg:w-3/6
                        lg:max-w-3xl
                    "
                >
                    {/* CONTENT */}
                    <div
                        className="
                            relative
                            flex
                            h-full
                            w-full
                            flex-col
                            rounded-lg
                            border-0
                            bg-white
                            shadow-lg
                            outline-none
                            focus:outline-none
                            lg:h-auto
                        "
                    >
                        {/* HEADER */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-l
                                p-10
                            "
                        >
                            <h3 className="text-3xl font-semibold text-black">{title}</h3>
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={handleClose}
                                className="
                                    ml-auto
                                    border-0
                                    p-1
                                    text-black
                                    transition
                                    hover:opacity-70
                                "
                            >
                                <AiOutlineClose size={20} />
                            </button>
                        </div>
                        {/* MODAL BODY */}
                        <div className="relative flex-auto p-10">{body}</div>
                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-10">
                            <button
                                onClick={handleSubmit}
                                disabled={disabled}
                                className="
                                    rounded-full
                                    border-2
                                    font-semibold
                                    transition
                                    hover:opacity-80
                                    cursor-pointer
                                    w-full
                                    bg-pink-300
                                    text-black
                                    border-black
                                    text-xl
                                    px-5
                                    py-3
                                "
                            >
                                {actionLabel}
                            </button>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;