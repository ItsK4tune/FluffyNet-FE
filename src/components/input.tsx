interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
    return (
        <input 
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            type={type}
            className="
                w-full
                rounded-md
                border-2
                border-neutral-200
                bg-white
                p-4
                text-lg
                text-black
                outline-none
                transition
                focus:border-2
                focus:border-pink-500
                disabled:cursor-not-allowed
                disabled:bg-neutral-300
                disabled:opacity-70
            "
        />
    );
};

export default Input;