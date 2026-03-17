import { useState, useEffect, useCallback } from 'react';

interface ScrollMetrics {
  y: number;
  isScrollingDown: boolean;
  isAtBottom: boolean;
  isAtTop: boolean;
  progress: number;
}

/**
 * Hook untuk memantau posisi scroll window.
 * Menggunakan inisialisasi state yang aman untuk mencegah "cascading renders".
 * * @param offset - Toleransi jarak (pixel) untuk deteksi dasar halaman.
 */
export function useScroll(offset: number = 20) {
  // Inisialisasi state langsung dengan nilai saat ini (jika di browser)
  // Ini mencegah pemanggilan setState tambahan tepat setelah mount.
  const [metrics, setMetrics] = useState<ScrollMetrics>(() => ({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    isScrollingDown: false,
    isAtBottom: false,
    isAtTop: typeof window !== 'undefined' ? window.scrollY <= 0 : true,
    progress: 0,
  }));

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    setMetrics((prev) => {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - offset;
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;

      // Optimasi: Hanya update state jika nilai vertikal (y) memang berubah
      if (prev.y === scrollTop && prev.isAtBottom === isAtBottom) return prev;

      return {
        y: scrollTop,
        isScrollingDown: scrollTop > prev.y,
        isAtBottom,
        isAtTop: scrollTop <= 0,
        progress: Math.min(100, Math.max(0, progress)),
      };
    });
  }, [offset]);

  const scrollToTop = (smooth: boolean = true) => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ...metrics, scrollToTop };
}