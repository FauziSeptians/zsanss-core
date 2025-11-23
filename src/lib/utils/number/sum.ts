/**
 * Menjumlahkan semua elemen dalam sebuah array angka.
 *
 * Fungsi ini menggunakan `Array.prototype.reduce` untuk menghitung total
 * dari seluruh nilai yang ada di dalam array. Jika array kosong, hasilnya adalah 0.
 *
 * @param arr - Array berisi angka-angka yang akan dijumlahkan.
 * @returns Jumlah total dari semua elemen array.
 *
 * @example
 * // Menjumlahkan angka dalam array
 * const total1 = sum([1, 2, 3, 4]);
 * console.log(total1); // 10
 *
 * @example
 * // Array dengan satu elemen
 * const total2 = sum([100]);
 * console.log(total2); // 100
 *
 * @example
 * // Array kosong menghasilkan 0
 * const total3 = sum([]);
 * console.log(total3); // 0
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}
