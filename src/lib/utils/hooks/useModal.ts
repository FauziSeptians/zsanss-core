/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

/**
 * Tipe dasar untuk pemetaan ID modal ke tipe data payload yang dibawa.
 * 
 * Pengguna library disarankan untuk melakukan *override* atau melakukan *extend* 
 * terhadap interface ini untuk mendapatkan dukungan Type-Safety yang maksimal.
 */
export type ModalRegistryValues = Record<string, any>;

/**
 * Representasi state internal untuk satu instance modal tertentu.
 * 
 * @template T - Tipe data payload yang dikirimkan saat modal dibuka.
 */
export interface ModalInstance<T = any> {
  /** Status apakah modal saat ini sedang tampil (terbuka) di layar. */
  isOpen: boolean;
  /** 
   * Data payload yang dikirim ke modal. 
   * Bernilai `null` jika modal dalam keadaan tertutup. 
   */
  data: T | null;
}

/**
 * Struktur store internal Zustand untuk manajemen state modal secara global.
 */
export interface ModalStore {
  /** Objek yang menyimpan seluruh state modal berdasarkan ID unik sebagai key. */
  modals: Record<string, ModalInstance>;
  /** 
   * Fungsi untuk menampilkan (membuka) modal tertentu.
   * @param id - ID unik modal yang ingin dibuka.
   * @param data - Payload data opsional yang ingin dikirimkan ke dalam modal.
   */
  onOpen: (id: string, data?: any) => void;
  /** 
   * Fungsi untuk menyembunyikan (menutup) modal dan membersihkan data di dalamnya.
   * @param id - ID unik modal yang ingin ditutup.
   */
  onClose: (id: string) => void;
}

/**
 * Store internal yang dikelola oleh Zustand. 
 * Tidak diekspos langsung untuk menjaga enkapsulasi. 
 * Gunakan hook {@link useModal} untuk berinteraksi dengan state ini.
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
 * Hook utama untuk mengakses, membuka, dan menutup modal dengan dukungan penuh Type-Safety.
 * 
 * Memungkinkan komponen untuk berlangganan pada state modal tertentu dan 
 * melakukan manipulasi (buka/tutup) dengan data yang ter-type secara otomatis.
 * 
 * @template R - Interface Registry yang mendefinisikan daftar modal dan tipe datanya.
 * @template K - Key (ID) dari modal yang tersedia di dalam Registry `R`.
 * 
 * @param id - ID unik modal yang ingin diakses.
 * @returns Objek berisi state `isOpen`, `data` yang sudah ter-type, serta fungsi kontrol `onOpen` & `onClose`.
 * 
 * @example
 * ```tsx
 * // 1. Definisikan Registry Modal Anda
 * interface MyModals {
 *   'edit-user': { userId: string; name: string };
 *   'delete-confirm': null;
 * }
 * 
 * // 2. Gunakan di dalam Komponen
 * const { isOpen, data, onOpen, onClose } = useModal<MyModals, 'edit-user'>('edit-user');
 * 
 * // 'data' akan otomatis bertipe { userId: string; name: string } | null
 * if (isOpen && data) {
 *   console.log(data.userId);
 * }
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
    /** 
     * Data payload yang dikirim saat `onOpen`. 
     * Tipenya mengikuti definisi yang ada di Registry `R[K]`. 
     */
    data: modalState.data as R[K] | null,
    /** 
     * Fungsi untuk memicu modal agar terbuka dengan payload data yang sesuai tipe. 
     */
    onOpen: (data?: R[K]) => onOpenAction(id as string, data),
    /** 
     * Fungsi untuk menutup modal dan mereset state data menjadi null. 
     */
    onClose: () => onCloseAction(id as string),
  };
}