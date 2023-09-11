import {create} from 'zustand';

interface useVehicleModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
}

export const useVehicleModal = create<useVehicleModalStore>((set) => ({
   isOpen : false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))