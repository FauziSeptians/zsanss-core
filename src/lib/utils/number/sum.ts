/**
 * Menjumlahkan seluruh elemen angka yang ada di dalam sebuah array.
 * 
 * Fungsi ini menggunakan `Array.prototype.reduce` untuk menghitung total akumulasi 
 * dari seluruh nilai. Sangat efisien untuk perhitungan total dataset numerik.
 * 
 * @param arr - Array berisi deretan angka yang akan dijumlahkan.
 * @returns Jumlah total (sum) dari seluruh elemen. Mengembalikan `0` jika array kosong.
 * 
 * @example
 * ```tsx
 * const data = [10, 20, 30, 40];
 * const total = sum(data);
 * // Hasil: 100
 * ```
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}
