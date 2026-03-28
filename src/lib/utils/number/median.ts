/**
 * Menghitung nilai median (nilai tengah) dari sebuah array angka.
 * 
 * Median adalah nilai yang berada tepat di tengah-tengah dataset yang telah diurutkan.
 * - Jika jumlah elemen ganjil, median adalah nilai di posisi paling tengah.
 * - Jika jumlah elemen genap, median adalah rata-rata dari dua nilai tengah.
 * 
 * @param arr - Array berisi deretan angka yang akan dihitung median-nya.
 * @returns Nilai median dari dataset. Mengembalikan `0` jika array kosong.
 * 
 * @example
 * ```tsx
 * // Jumlah ganjil: [1, 2, 3] -> Median: 2
 * const m1 = median([1, 3, 2]);
 * 
 * // Jumlah genap: [1, 2, 3, 4] -> Median: (2+3)/2 = 2.5
 * const m2 = median([1, 2, 3, 4]);
 * ```
 */
export function median(arr: number[]): number {
  if (arr.length === 0) return 0;

  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    // jumlah elemen ganjil → ambil elemen tengah
    return sorted[mid];
  } else {
    // jumlah elemen genap → rata-rata dua elemen tengah
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
}
