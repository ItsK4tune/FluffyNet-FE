import { useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const EditItem = () => {
    const onEdit = useCallback(() => {

    },[]);
    return (
        <div
            onClick={onEdit}
            className="
                flex
                cursor-pointer
                flex-row
                items-center
                gap-2
                text-neutral-500
                transition
                hover: text-green-500
            "
        >
            <AiOutlineEdit size={20} />
        </div>
    );
}
export default EditItem;