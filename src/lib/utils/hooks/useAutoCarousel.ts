import { useState, useEffect, useRef } from 'react';

/**
 * Properti untuk hook useAutoCarousel.
 */
interface UseAutoCarouselProps<T> {
  /** Array data yang akan di-looping. */
  items: T[];
  /** Durasi perpindahan antar slide (ms). Default: 3000ms. */
  interval?: number;
}

/**
 * Hook untuk Carousel yang berjalan otomatis sepenuhnya.
 * Cocok untuk banner promo, testimonial slider, atau logo ticker.
 * * @example
 * const { activeItem } = useAutoCarousel({ items: bannerImages, interval: 5000 });
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
    /** Item yang sedang aktif saat ini */
    activeItem: items[activeIndex],
    /** Indeks saat ini (untuk keperluan styling bullet/indicator) */
    activeIndex,
    /** Total item */
    totalItems: items.length,
  };
}