import { cn } from "../../libs/utils";

interface InputFormProps {
    icon: string;
    type?: string;
    placeholder: string;
    className?: string
}

export const InputForm = ({ icon, type = 'text', placeholder, className} : InputFormProps) => {
    return (
        <div className="p-2 rounded-xl bg-gray-200 flex gap-2 align-center justify-center">
            <span className='mdi-filled'>{icon}</span>
            <input 
                type={type}
                placeholder={placeholder}
                className={cn('w-full', className)}
            />
        </div>
    )
}