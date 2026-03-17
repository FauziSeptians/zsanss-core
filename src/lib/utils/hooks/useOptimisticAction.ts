import { useState, useCallback } from 'react';

/**
 * Properti konfigurasi untuk hook useOptimisticAction.
 * @template T Tipe data dari entitas yang akan diolah.
 */
interface UseOptimisticProps<T> {
  /** * Data awal yang sinkron dengan state server saat ini. 
   */
  data: T;
  /** * Fungsi asinkron untuk melakukan pembaruan data ke server (misal: API call).
   * @param newData Data yang telah dimodifikasi secara lokal.
   * @returns Promise berisi hasil respons server.
   */
  onUpdate: (newData: T) => Promise<T>;
  /** * Callback opsional yang dipanggil ketika fungsi `onUpdate` gagal.
   * Berguna untuk menampilkan notifikasi error (toast) kepada pengguna.
   * @param error Objek error yang dilempar oleh server/network.
   * @param rollbackData Data asli sebelum perubahan dilakukan (untuk referensi).
   */
  onError?: (error: unknown, rollbackData: T) => void;
}

/**
 * Hook kustom untuk mengelola pembaruan antarmuka secara optimis (Optimistic UI).
 * * Memungkinkan UI berubah seketika tanpa menunggu respons server. Jika permintaan 
 * server gagal, hook ini secara otomatis akan melakukan rollback ke state sebelumnya.
 * * @template T Tipe data objek yang dikelola.
 * @param props - Objek konfigurasi {@link UseOptimisticProps}.
 * * @returns Objek yang berisi state optimis, status pending, dan fungsi eksekusi.
 * * @example
 * ```tsx
 * // Contoh implementasi pada fitur Bookmark
 * const { optimisticData, execute, isPending } = useOptimisticAction({
 * data: { id: 1, isBookmarked: false },
 * onUpdate: async (newPost) => api.patch(`/posts/${newPost.id}`, newPost),
 * onError: (err) => toast.error("Gagal menyimpan bookmark")
 * });
 * * const handleToggle = () => {
 * execute((current) => ({ ...current, isBookmarked: !current.isBookmarked }));
 * };
 * ```
 */
export function useOptimisticAction<T>({
  data,
  onUpdate,
  onError,
}: UseOptimisticProps<T>) {
  /** State lokal yang menampung data sementara (optimis). */
  const [optimisticData, setOptimisticData] = useState<T>(data);
  
  /** Status yang menandakan apakah proses sinkronisasi server sedang berjalan. */
  const [isPending, setIsPending] = useState(false);

  /**
   * Fungsi untuk menjalankan perubahan data.
   * Secara instan memperbarui `optimisticData` dan memicu `onUpdate`.
   * * @param updateFn Fungsi transformator yang menerima data saat ini dan mengembalikan data baru.
   */
  const execute = useCallback(
    async (updateFn: (current: T) => T) => {
      const previousData = optimisticData;
      const newData = updateFn(optimisticData);

      // 1. Tahap Optimis: Update UI tanpa menunggu server
      setOptimisticData(newData);
      setIsPending(true);

      try {
        // 2. Tahap Sinkronisasi: Kirim perubahan ke backend
        await onUpdate(newData);
      } catch (err) {
        // 3. Tahap Rollback: Kembalikan ke data lama jika server gagal
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
    /** * Data yang sedang ditampilkan di UI. 
     * Gunakan ini sebagai pengganti data asli dari props/state utama.
     */
    optimisticData,
    /** * Fungsi pemicu perubahan. Masukkan logika manipulasi data di sini.
     */
    execute,
    /** * Menandakan proses background ke server masih berlangsung. 
     * Berguna untuk menampilkan indikator loading kecil atau menonaktifkan tombol.
     */
    isPending,
  };
}