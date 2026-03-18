/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

/**
 * Tipe dasar untuk pemetaan ID modal ke tipe data yang dibawa.
 * User harus melakukan 'override' atau extend interface ini.
 */
export type ModalRegistryValues = Record<string, any>;

/**
 * Representasi state internal untuk satu instance modal.
 * @template T - Tipe data payload yang dikirim saat modal dibuka.
 */
export interface ModalInstance<T = any> {
  /** Status apakah modal sedang tampil di layar. */
  isOpen: boolean;
  /** Data payload yang dikirim ke modal. Bernilai `null` jika modal tertutup. */
  data: T | null;
}

/**
 * Struktur store internal Zustand untuk manajemen modal global.
 */
export interface ModalStore {
  /** Objek berisi seluruh state modal berdasarkan ID unik. */
  modals: Record<string, ModalInstance>;
  /** * Fungsi untuk membuka modal.
   * @param id - ID unik modal.
   * @param data - Payload data opsional.
   */
  onOpen: (id: string, data?: any) => void;
  /** * Fungsi untuk menutup modal dan membersihkan data di dalamnya.
   * @param id - ID unik modal.
   */
  onClose: (id: string) => void;
}

/**
 * Store internal yang tidak diekspos langsung ke user (Encapsulated).
 * Gunakan {@link useModal} untuk berinteraksi dengan store ini.
 */
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

/**
 * Hook utama untuk mengakses, membuka, dan menutup modal dengan dukungan Type-Safety.
 * * @template R - Interface Registry yang berisi daftar modal dan tipe datanya.
 * @template K - Key dari ID modal yang tersedia di dalam Registry.
 * * @param id - ID unik modal yang ingin diakses.
 * * @returns Objek berisi state `isOpen`, `data` yang sudah ter-type, serta fungsi `onOpen` & `onClose`.
 * * @example
 * ```tsx
 * // 1. Definisikan Registry
 * interface MyModals {
 * 'edit-user': { userId: string; name: string };
 * 'delete-confirm': null;
 * }
 * * // 2. Gunakan di Komponen
 * const { isOpen, data, onOpen } = useModal<MyModals, 'edit-user'>('edit-user');
 * * // 'data' akan otomatis bertipe { userId: string; name: string } | null
 * ```
 */
export function useModal<R extends ModalRegistryValues, K extends keyof R>(id: K) {
  const modalState = useInternalModalStore((s) => s.modals[id as string]) || { 
    isOpen: false, 
    data: null 
  };
  
  const onOpenAction = useInternalModalStore((s) => s.onOpen);
  const onCloseAction = useInternalModalStore((s) => s.onClose);

  return {
    /** Status aktif modal saat ini. */
    isOpen: modalState.isOpen,
    /** Data yang dikirim saat `onOpen`. Tipenya mengikuti definisi di Registry `R[K]`. */
    data: modalState.data as R[K] | null,
    /** Fungsi untuk memicu modal agar terbuka dengan payload data yang sesuai tipe. */
    onOpen: (data?: R[K]) => onOpenAction(id as string, data),
    /** Fungsi untuk menutup modal. */
    onClose: () => onCloseAction(id as string),
  };
}