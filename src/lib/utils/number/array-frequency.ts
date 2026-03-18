/**
 * Menghitung frekuensi kemunculan angka tertentu di dalam sebuah array.
 * * Fungsi ini menggunakan metode `reduce` untuk melakukan iterasi tunggal pada array, 
 * menjadikannya efisien secara performa ($O(n)$) dan ringkas secara kode.
 * * @param arr - Array berisi angka-angka yang akan diperiksa.
 * @param num - Angka spesifik yang ingin dicari frekuensinya.
 * @returns Jumlah total kemunculan angka `num` di dalam `arr`.
 * * @example
 * ```typescript
 * const data = [1, 2, 3, 2, 4, 2];
 * const result = arrayFrequency(data, 2);
 * // result: 3
 * ```
 */
export default function arrayFrequency(arr: number[], num: number): number {
  return arr.reduce((count, val) => (val === num ? count + 1 : count), 0);
}