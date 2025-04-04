import { useCallback } from "react"
import { AiOutlineDelete } from "react-icons/ai";

const DeleteItem = () => {
    const onDelete = useCallback(() => {        
    },[]);

    return (
        <div
            onClick={onDelete}
            className="
                flex
                cursor-pointer
                flex-row
                items-center
                gap-2
                text-neutral-500
                transition
                hover: text-red-500
            "
        >
            <AiOutlineDelete size={20} />
        </div>
    );
}

export default DeleteItem;