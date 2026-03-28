import { useState, useCallback } from 'react';

/**
 * Properti konfigurasi untuk hook {@link useOptimisticAction}.
 * 
 * @template T - Tipe data dari entitas atau objek yang akan dikelola.
 */
interface UseOptimisticProps<T> {
  /** 
   * Data awal yang saat ini tersinkronisasi dengan state di server.
   */
  data: T;
  /** 
   * Fungsi asinkron untuk melakukan pembaruan data ke server (misal: API patch/put).
   * @param newData - Data yang telah dimodifikasi secara lokal untuk dikirim ke server.
   * @returns Promise yang mengembalikan hasil respons dari server.
   */
  onUpdate: (newData: T) => Promise<T>;
  /** 
   * Callback opsional yang dipanggil jika fungsi `onUpdate` mengalami kegagalan.
   * Sangat berguna untuk memberikan umpan balik (seperti toast error) kepada pengguna.
   * @param error - Objek error yang ditangkap saat proses pembaruan gagal.
   * @param rollbackData - Data asli sebelum perubahan dilakukan, digunakan untuk referensi saat error.
   */
  onError?: (error: unknown, rollbackData: T) => void;
}

/**
 * Hook kustom untuk mengelola pembaruan antarmuka secara optimis (Optimistic UI).
 * 
 * Fitur ini memungkinkan antarmuka pengguna (UI) untuk berubah seketika tanpa perlu 
 * menunggu respons dari server. Jika permintaan ke server gagal (error), hook ini 
 * akan secara otomatis melakukan rollback ke state sebelumnya yang stabil.
 * 
 * @template T - Tipe data objek yang dikelola.
 * @param props - Konfigurasi yang meliputi data awal, fungsi update, dan penanganan error.
 * @returns Objek yang berisi state optimis (`optimisticData`), status pending (`isPending`), dan fungsi eksekusi (`execute`).
 * 
 * @example
 * ```tsx
 * // Contoh implementasi pada fitur Bookmark
 * const { optimisticData, execute, isPending } = useOptimisticAction({
 *   data: { id: 1, isBookmarked: false },
 *   onUpdate: async (newPost) => api.patch(`/posts/${newPost.id}`, newPost),
 *   onError: (err) => toast.error("Gagal menyimpan bookmark")
 * });
 * 
 * const handleToggle = () => {
 *   execute((current) => ({ 
 *     ...current, 
 *     isBookmarked: !current.isBookmarked 
 *   }));
 * };
 * ```
 */
export function useOptimisticAction<T>({
  data,
  onUpdate,
  onError,
}: UseOptimisticProps<T>) {
  /** State lokal yang menampung data sementara (optimis) sebelum konfirmasi server. */
  const [optimisticData, setOptimisticData] = useState<T>(data);
  
  /** Status yang menandakan apakah proses sinkronisasi ke server sedang berlangsung. */
  const [isPending, setIsPending] = useState(false);

  /**
   * Fungsi untuk mengeksekusi perubahan data secara optimis.
   * 
   * Fungsi ini akan memperbarui `optimisticData` secara instan di sisi klien
   * dan kemudian memicu pemanggilan `onUpdate` asynchronous ke server.
   * 
   * @param updateFn - Fungsi transformator yang menerima data saat ini dan mengembalikan data baru.
   */
  const execute = useCallback(
    async (updateFn: (current: T) => T) => {
      const previousData = optimisticData;
      const newData = updateFn(optimisticData);

      // 1. Tahap Optimis: Update UI segera tanpa menunggu respons server
      setOptimisticData(newData);
      setIsPending(true);

      try {
        // 2. Tahap Sinkronisasi: Kirim perubahan data ke backend
        await onUpdate(newData);
      } catch (err) {
        // 3. Tahap Rollback: Kembalikan ke state data lama jika terjadi kegagalan di server
        setOptimisticData(previousData);
        if (onError) {
          onError(err, previousData);
        }
      } finally {
        setIsPending(false);
      }
    },
    [onUpdate, optimisticData, onError]
  );

  return {
    /** 
     * Data yang sedang aktif ditampilkan di UI (mungkin berisi data optimis yang belum tersimpan). 
     * Gunakan properti ini sebagai sumber data utama pada komponen Anda.
     */
    optimisticData,
    /** 
     * Fungsi pemicu untuk melakukan perubahan data. 
     * Menerima fungsi callback untuk memodifikasi state secara fungsional.
     */
    execute,
    /** 
     * Menandakan bahwa proses sinkronisasi latar belakang ke server masih berjalan. 
     * Umumnya digunakan untuk menampilkan indikator loading atau mendisabel interaksi.
     */
    isPending,
  };
}