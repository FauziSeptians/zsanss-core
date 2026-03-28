import { useState, useEffect, useCallback } from 'react';

/**
 * Representasi metrik posisi scroll pada jendela (window) secara real-time.
 */
export interface ScrollMetrics {
  /** Posisi scroll vertikal saat ini (dihitung dalam pixel dari atas dokumen). */
  y: number;
  /** Menandakan apakah pengguna saat ini sedang melakukan scroll ke arah bawah. */
  isScrollingDown: boolean;
  /** Menandakan apakah posisi scroll saat ini sudah mencapai atau melewati dasar halaman. */
  isAtBottom: boolean;
  /** Menandakan apakah posisi scroll saat ini berada di bagian paling atas halaman (y <= 0). */
  isAtTop: boolean;
  /** Persentase progres scroll dari seluruh panjang halaman yang dapat di-scroll (0 - 100). */
  progress: number;
}

/**
 * Hook utilitas untuk memantau aktivitas dan posisi scroll pada window secara real-time.
 * 
 * Hook ini dioptimasi untuk mencegah re-render yang tidak perlu dengan membandingkan 
 * nilai sebelumnya (state memoization) dan menggunakan event listener pasif untuk performa maksimal.
 * 
 * @param offset - Jarak toleransi (pixel) dari batas bawah halaman untuk memicu status `isAtBottom`. Default: `20`.
 * @returns Objek yang berisi {@link ScrollMetrics} lengkap dan fungsi helper `scrollToTop`.
 * 
 * @example
 * ```tsx
 * const { y, isScrollingDown, progress, scrollToTop } = useScroll(50);
 * 
 * return (
 *   <div className="scroll-container">
 *     <p>Posisi Scroll: {y}px</p>
 *     <button onClick={() => scrollToTop()}>Kembali ke Atas</button>
 *   </div>
 * );
 * ```
 */
export function useScroll(offset: number = 20) {
  const [metrics, setMetrics] = useState<ScrollMetrics>(() => ({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    isScrollingDown: false,
    isAtBottom: false,
    isAtTop: typeof window !== 'undefined' ? window.scrollY <= 0 : true,
    progress: 0,
  }));

  /**
   * Handler internal untuk menghitung metrik scroll berdasarkan posisi window.
   */
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    setMetrics((prev) => {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - offset;
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;

      // Optimasi: Mencegah pembaruan state jika tidak ada perubahan nilai yang signifikan
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

  /**
   * Fungsi helper untuk mengembalikan posisi scroll ke bagian paling atas halaman.
   * 
   * @param smooth - Jika `true`, scroll akan bergerak secara halus (smooth animation). Default: `true`.
   */
  const scrollToTop = (smooth: boolean = true) => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    // Menggunakan passive listener untuk performa scrolling yang lebih lancar, terutama di perangkat mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ...metrics, scrollToTop };
}