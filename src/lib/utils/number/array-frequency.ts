/**
 * Menghitung frekuensi kemunculan angka tertentu di dalam sebuah array.
 * 
 * Fungsi ini menggunakan metode `reduce` untuk melakukan iterasi tunggal pada array, 
 * menjadikannya sangat efisien dari segi performa ($O(n)$) dan ringkas.
 * 
 * @param arr - Array berisi kumpulan angka yang akan diperiksa.
 * @param num - Angka spesifik yang ingin dihitung jumlah kemunculannya.
 * @returns Jumlah total kemunculan angka `num` di dalam array `arr`.
 * 
 * @example
 * ```tsx
 * const data = [1, 2, 3, 2, 4, 2];
 * const kemunculanDua = arrayFrequency(data, 2);
 * // Hasil: 3
 * ```
 */
export default function arrayFrequency(arr: number[], num: number): number {
  return arr.reduce((count, val) => (val === num ? count + 1 : count), 0);
}