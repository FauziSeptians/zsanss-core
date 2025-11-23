/**
 * Menghitung median dari sebuah array angka.
 *
 * Median adalah nilai tengah dari data yang sudah diurutkan.
 * - Jika jumlah elemen ganjil, median adalah elemen di posisi tengah.
 * - Jika jumlah elemen genap, median adalah rata-rata dari dua elemen tengah.
 * Jika array kosong, fungsi akan mengembalikan 0.
 *
 * @param arr - Array berisi angka-angka yang akan dihitung median-nya.
 * @returns Nilai median dari array, atau 0 jika array kosong.
 *
 * @example
 * // Array dengan jumlah elemen ganjil
 * const m1 = median([1, 3, 2]);
 * console.log(m1); // 2
 *
 * @example
 * // Array dengan jumlah elemen genap
 * const m2 = median([1, 2, 3, 4]);
 * console.log(m2); // 2.5
 *
 * @example
 * // Array kosong menghasilkan 0
 * const m3 = median([]);
 * console.log(m3); // 0
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
