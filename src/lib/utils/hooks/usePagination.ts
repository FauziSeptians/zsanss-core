import { useState } from 'react';

/**
 * Properti untuk hook usePagination.
 */
interface UsePaginationProps {
  /** Total seluruh item dalam dataset. */
  totalItems: number;
  /** Jumlah item yang ingin ditampilkan per halaman. */
  itemsPerPage: number;
  /** Halaman awal saat pertama kali dimuat. Default adalah 1. */
  initialPage?: number;
}

/**
 * Hook kustom untuk mengelola logika pagination secara lokal.
 * * @param props - Objek konfigurasi {@link UsePaginationProps}.
 * @returns Objek yang berisi state halaman saat ini, fungsi navigasi, dan indeks data.
 * * @example
 * ```tsx
 * const { currentPage, nextPage, startIndex, endIndex } = usePagination({
 * totalItems: 100,
 * itemsPerPage: 10
 * });
 * * // Gunakan slice untuk menampilkan data
 * const currentData = data.slice(startIndex, endIndex);
 * ```
 */
export const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  /** Total halaman yang tersedia berdasarkan totalItems dan itemsPerPage. */
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /** Indeks awal item pada halaman saat ini (inklusif). Digunakan untuk `Array.slice()`. */
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  /** Indeks akhir item pada halaman saat ini (eksklusif). Digunakan untuk `Array.slice()`. */
  const endIndex = startIndex + itemsPerPage;

  /**
   * Berpindah ke halaman tertentu secara spesifik.
   * @param page - Nomor halaman tujuan.
   */
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  /** Berpindah ke halaman berikutnya jika tersedia. */
  const nextPage = () => goToPage(currentPage + 1);

  /** Berpindah ke halaman sebelumnya jika tersedia. */
  const prevPage = () => goToPage(currentPage - 1);

  return {
    /** Halaman aktif saat ini. */
    currentPage,
    /** Jumlah total halaman yang tersedia. */
    totalPages,
    /** Fungsi untuk berpindah ke halaman selanjutnya. */
    nextPage,
    /** Fungsi untuk berpindah ke halaman sebelumnya. */
    prevPage,
    /** Fungsi untuk berpindah ke halaman yang ditentukan. */
    goToPage,
    /** Indeks awal data untuk slicing array. */
    startIndex,
    /** Indeks akhir data untuk slicing array. */
    endIndex,
    /** Flag untuk mengecek apakah tombol 'Next' harus aktif. */
    canNextPage: currentPage < totalPages,
    /** Flag untuk mengecek apakah tombol 'Previous' harus aktif. */
    canPrevPage: currentPage > 1,
  };
};