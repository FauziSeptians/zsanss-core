import { useState, useEffect, useCallback } from 'react';

/**
 * Representasi metrik posisi scroll pada jendela (window).
 */
export interface ScrollMetrics {
  /** Posisi scroll vertikal saat ini (dalam pixel). */
  y: number;
  /** Menandakan apakah pengguna sedang melakukan scroll ke arah bawah. */
  isScrollingDown: boolean;
  /** Menandakan apakah posisi scroll sudah mencapai dasar halaman (berdasarkan offset). */
  isAtBottom: boolean;
  /** Menandakan apakah posisi scroll berada di paling atas halaman (y <= 0). */
  isAtTop: boolean;
  /** Persentase progres scroll dari seluruh panjang halaman (0 - 100). */
  progress: number;
}

/**
 * Hook utilitas untuk memantau aktivitas dan posisi scroll pada window secara real-time.
 * * Hook ini dioptimasi untuk mencegah re-render yang tidak perlu dengan membandingkan 
 * nilai sebelumnya (state memoization) dan menggunakan event listener pasif.
 * * @param offset - Jarak toleransi (pixel) dari bawah halaman untuk memicu status `isAtBottom`. Default: `20`.
 * @returns Objek berisi {@link ScrollMetrics} dan fungsi helper `scrollToTop`.
 * * @example
 * ```tsx
 * const { y, isScrollingDown, progress, scrollToTop } = useScroll(50);
 * * return (
 * <>
 * <div style={{ width: `${progress}%` }} className="progress-bar" />
 * <button onClick={() => scrollToTop()}>Back to Top</button>
 * </>
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
   * Handler internal untuk menghitung metrik scroll.
   * Dibuat menggunakan useCallback untuk stabilitas referensi di useEffect.
   */
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    setMetrics((prev) => {
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - offset;
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;

      // Optimasi: Mencegah re-render jika tidak ada perubahan nilai yang signifikan
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
   * Fungsi helper untuk mengembalikan posisi scroll ke paling atas.
   * @param smooth - Jika `true`, scroll akan bergerak secara halus (smooth). Default: `true`.
   */
  const scrollToTop = (smooth: boolean = true) => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    // Menggunakan passive listener untuk performa scroll yang lebih lancar di mobile
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ...metrics, scrollToTop };
}