import { useState, useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';

/**
 * Hook untuk mendeteksi status koneksi internet secara real-time.
 * 
 * Menggunakan `onlineManager` dari TanStack Query untuk memastikan konsistensi status 
 * koneksi di seluruh aplikasi dan sinkronisasi dengan query fungsional lainnya.
 * 
 * @returns {boolean} `isOnline` - Bernilai `true` jika perangkat terhubung ke internet, `false` jika offline.
 * 
 * @example
 * ```tsx
 * const isOnline = useOnlineStatus();
 * 
 * if (!isOnline) {
 *   return (
 *     <div className="bg-destructive text-white p-2">
 *       Anda sedang offline. Data yang ditampilkan mungkin tidak terbaru.
 *     </div>
 *   );
 * }
 * ```
 */
export function useOnlineStatus(): boolean {
  // Ambil status awal dari onlineManager
  const [isOnline, setIsOnline] = useState<boolean>(onlineManager.isOnline());

  useEffect(() => {
    /**
     * Berlangganan (subscribe) ke perubahan status dari onlineManager.
     * Fungsi ini akan dipanggil secara otomatis oleh TanStack Query 
     * ketika browser mendeteksi perubahan network (online/offline).
     */
    const unsubscribe = onlineManager.subscribe((online) => {
      setIsOnline(online);
    });

    // Membersihkan subscription saat komponen unmount untuk mencegah memory leak
    return () => {
      unsubscribe();
    };
  }, []);

  return isOnline;
}