import { create } from "zustand";

interface PostCreateModalStore {
    post_id: number;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    setPostId: (post_id: number) => void;
}

const usePostCreateModal = create<PostCreateModalStore> ((set) => ({
    post_id: 0,
    isOpen: false,
    setPostId: (post_id) => set({ post_id }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default usePostCreateModal;