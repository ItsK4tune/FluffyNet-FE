import { cn } from "../../libs/utils";
import { ChangeEvent, ReactNode } from 'react';

interface InputFormProps {
  name?: string; 
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm = ({ 
  name,  
  icon, 
  type = 'text', 
  placeholder, 
  className, 
  value, 
  onChange
}: InputFormProps) => {
    return (
        <div className="p-2 rounded-xl bg-gray-200 flex gap-2 align-center justify-center">
            <span className='mdi-filled'>{icon}</span>
            <input 
                name={name}  
                type={type}
                placeholder={placeholder}
                className={cn('w-full', className)}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}