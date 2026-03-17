/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export type ModalRegistryValues = Record<string, any>;

export interface ModalInstance<T = any> {
  isOpen: boolean;
  data: T | null;
}

export interface ModalStore {
  modals: Record<string, ModalInstance>;
  onOpen: (id: string, data?: any) => void;
  onClose: (id: string) => void;
}

const useInternalModalStore = create<ModalStore>((set) => ({
  modals: {},
  onOpen: (id, data = null) => 
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: true, data: data ?? null } }
    })),
  onClose: (id) => 
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: false, data: null } }
    })),
}));

// --- THE MAGIC HOOK (Public API) ---
/**
 * Hook utama untuk mengakses modal berdasarkan ID.
 * @template R Interface Registry yang didefinisikan user.
 * @template K Key dari Modal ID.
 */
export function useModal<R extends ModalRegistryValues, K extends keyof R>(id: K) {
  // Kita ambil state dari internal store library
  const modalState = useInternalModalStore((s) => s.modals[id as string]) || { 
    isOpen: false, 
    data: null 
  };
  
  const onOpenAction = useInternalModalStore((s) => s.onOpen);
  const onCloseAction = useInternalModalStore((s) => s.onClose);

  return {
    isOpen: modalState.isOpen,
    data: modalState.data as R[K] | null,
    onOpen: (data?: R[K]) => onOpenAction(id as string, data),
    onClose: () => onCloseAction(id as string),
  };
}