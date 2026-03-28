import { useState, useEffect, useRef } from 'react';

/**
 * Properti untuk konfigurasi hook {@link useAutoCarousel}.
 * 
 * @template T - Tipe data item yang ada di dalam array `items`.
 */
interface UseAutoCarouselProps<T> {
  /** Array data yang akan ditampilkan secara bergantian (looping). */
  items: T[];
  /** Durasi perpindahan antar slide dalam milidetik (ms). Default: `3000`ms. */
  interval?: number;
}

/**
 * Hook untuk Carousel yang berjalan otomatis sepenuhnya.
 * 
 * Sangat cocok digunakan untuk banner promosi, slider testimoni, atau ticker logo 
 * yang memerlukan rotasi item otomatis tanpa interaksi pengguna yang kompleks.
 * 
 * @template T - Tipe data item dalam array.
 * @param props - Objek properti yang berisi `items` dan `interval`.
 * @returns Objek yang berisi item aktif (`activeItem`), indeks aktif (`activeIndex`), dan total item (`totalItems`).
 * 
 * @example
 * ```tsx
 * const { activeItem, activeIndex } = useAutoCarousel({ 
 *   items: bannerImages, 
 *   interval: 5000 
 * });
 * 
 * return <img src={activeItem.url} alt={`Banner ${activeIndex}`} />;
 * ```
 */
export function useAutoCarousel<T>({
  items,
  interval = 3000,
}: UseAutoCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menggunakan useRef agar referensi interval tetap bersih
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // 1. Jangan jalankan timer jika item kosong atau hanya ada 1 item
    if (items.length <= 1) return;

    // 2. Setup interval otomatis
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, interval);

    // 3. Cleanup: Hapus interval saat komponen di-unmount atau items berubah
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, interval]); // Hanya restart jika jumlah item atau durasi berubah

  return {
    /** Item yang sedang aktif saat ini berdasarkan `activeIndex`. */
    activeItem: items[activeIndex],
    /** Indeks item yang sedang aktif saat ini (0-based). */
    activeIndex,
    /** Jumlah total item yang tersedia di dalam array `items`. */
    totalItems: items.length,
  };
}