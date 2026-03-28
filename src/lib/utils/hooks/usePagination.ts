import { useState } from 'react';

/**
 * Properti konfigurasi untuk hook {@link usePagination}.
 */
interface UsePaginationProps {
  /** Jumlah total seluruh item di dalam dataset yang akan dipaginasi. */
  totalItems: number;
  /** Batas jumlah item yang ingin ditampilkan per halaman tunggal. */
  itemsPerPage: number;
  /** Nomor halaman awal saat komponen pertama kali dimuat. Default: `1`. */
  initialPage?: number;
}

/**
 * Hook kustom untuk mengelola logika navigasi halaman (pagination) secara lokal.
 * 
 * Hook ini menghitung total halaman, indeks awal/akhir untuk pemotongan data (slicing), 
 * serta menyediakan fungsi navigasi seperti `nextPage`, `prevPage`, dan `goToPage`.
 * 
 * @param props - Objek konfigurasi yang meliputi `totalItems`, `itemsPerPage`, dan `initialPage`.
 * @returns Objek yang berisi state halaman saat ini, total halaman, fungsi navigasi, serta indeks data.
 * 
 * @example
 * ```tsx
 * const { 
 *   currentPage, 
 *   nextPage, 
 *   startIndex, 
 *   endIndex, 
 *   canNextPage 
 * } = usePagination({
 *   totalItems: 100,
 *   itemsPerPage: 10
 * });
 * 
 * // Menggunakan indeks untuk memotong array data lokal
 * const currentData = allData.slice(startIndex, endIndex);
 * 
 * return (
 *   <div>
 *     {currentData.map(item => <Card key={item.id} data={item} />)}
 *     <button onClick={nextPage} disabled={!canNextPage}>Next</button>
 *   </div>
 * );
 * ```
 */
export const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  /** Menghitung total halaman yang tersedia berdasarkan dataset. */
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /** Indeks awal item pada halaman saat ini untuk kebutuhan `Array.slice()`. */
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  /** Indeks akhir item pada halaman saat ini untuk kebutuhan `Array.slice()`. */
  const endIndex = startIndex + itemsPerPage;

  /**
   * Fungsi untuk berpindah ke nomor halaman tertentu secara spesifik.
   * 
   * @param page - Nomor halaman tujuan. Akan divalidasi agar tetap dalam rentang yang valid.
   */
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  /** Berpindah secara otomatis ke satu halaman berikutnya jika tersedia. */
  const nextPage = () => goToPage(currentPage + 1);

  /** Berpindah secara otomatis ke satu halaman sebelumnya jika tersedia. */
  const prevPage = () => goToPage(currentPage - 1);

  return {
    /** Nomor halaman yang sedang aktif saat ini. */
    currentPage,
    /** Jumlah total halaman yang berhasil dihitung dari dataset. */
    totalPages,
    /** Fungsi pemicu untuk berpindah ke halaman selanjutnya. */
    nextPage,
    /** Fungsi pemicu untuk berpindah ke halaman sebelumnya. */
    prevPage,
    /** Fungsi pemicu untuk melompat ke halaman tertentu. */
    goToPage,
    /** Indeks awal data yang digunakan untuk memotong (slice) array utama. */
    startIndex,
    /** Indeks akhir data yang digunakan untuk memotong (slice) array utama. */
    endIndex,
    /** Flag penanda apakah pengguna masih bisa berpindah ke halaman berikutnya. */
    canNextPage: currentPage < totalPages,
    /** Flag penanda apakah pengguna masih bisa kembali ke halaman sebelumnya. */
    canPrevPage: currentPage > 1,
  };
};