import { cn } from "../../libs/utils";

export const InputForm = ({ icon, type = 'text', placeholder, className, value, onChange} : any) => {
    return (
        <div className="p-2 rounded-xl bg-gray-200 flex gap-2 align-center justify-center">
            <span className='mdi-filled'>{icon}</span>
            <input 
                type={type}
                placeholder={placeholder}
                className={cn('w-full', className)}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
