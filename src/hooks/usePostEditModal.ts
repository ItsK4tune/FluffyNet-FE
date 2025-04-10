import { create } from "zustand";

interface PostEditModalStore {
    post_id: number;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    setPostId: (post_id: number) => void;
}

const usePostEditModal = create<PostEditModalStore> ((set) => ({
    post_id: 0,
    isOpen: false,
    setPostId: (post_id) => set({ post_id }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default usePostEditModal;