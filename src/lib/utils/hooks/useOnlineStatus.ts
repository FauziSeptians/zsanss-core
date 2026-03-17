import { useState, useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';

/**
 * Hook untuk mendeteksi status koneksi internet secara real-time.
 * Menggunakan onlineManager dari TanStack Query untuk konsistensi status di seluruh aplikasi.
 * * @returns {boolean} isOnline - True jika terhubung ke internet, False jika offline.
 * * @example
 * ```tsx
 * const isOnline = useOnlineStatus();
 * * if (!isOnline) {
 * return <div className="bg-red-500">Anda sedang offline. Data mungkin tidak akurat.</div>;
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
     * ketika browser mendeteksi perubahan network.
     */
    const unsubscribe = onlineManager.subscribe((online) => {
      setIsOnline(online);
    });

    // Membersihkan subscription saat komponen unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return isOnline;
}