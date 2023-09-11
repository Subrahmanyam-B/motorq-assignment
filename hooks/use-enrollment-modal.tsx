import {create} from 'zustand';

interface useEnrollmentModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
}

export const useEnrollmentModal = create<useEnrollmentModalStore>((set) => ({
   isOpen : false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))