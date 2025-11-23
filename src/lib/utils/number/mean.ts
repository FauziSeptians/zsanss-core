/**
 * Menghitung nilai rata-rata (mean) dari sebuah array angka.
 *
 * Fungsi ini menjumlahkan semua elemen dalam array lalu membaginya
 * dengan jumlah elemen untuk mendapatkan nilai rata-rata.
 * Jika array kosong, fungsi akan mengembalikan 0.
 *
 * @param arr - Array berisi angka-angka yang akan dihitung rata-ratanya.
 * @returns Nilai rata-rata dari elemen array, atau 0 jika array kosong.
 *
 * @example
 * // Menghitung rata-rata dari [1, 2, 3, 4]
 * const avg1 = mean([1, 2, 3, 4]);
 * console.log(avg1); // 2.5
 *
 * @example
 * // Menghitung rata-rata dari [10, 20, 30]
 * const avg2 = mean([10, 20, 30]);
 * console.log(avg2); // 20
 *
 * @example
 * // Array kosong akan menghasilkan 0
 * const avg3 = mean([]);
 * console.log(avg3); // 0
 */
export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sumTotal = arr.reduce((acc, val) => acc + val, 0);

  return sumTotal / arr.length;
}
