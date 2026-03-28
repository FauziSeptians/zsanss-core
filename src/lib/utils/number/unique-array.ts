/**
 * Menghapus elemen duplikat dari sebuah array dan menghasilkan array baru berisi nilai unik.
 * 
 * Fungsi ini menggunakan struktur data `Set` untuk menjamin keunikan nilai secara efisien. 
 * Urutan elemen tetap dipertahankan sesuai dengan kemunculan pertamanya di dalam array asli.
 * 
 * @template T - Tipe data elemen di dalam array (string, number, atau objek).
 * @param arr - Array sumber yang mungkin mengandung nilai duplikat.
 * @returns Array baru yang hanya berisi elemen-elemen unik.
 * 
 * @example
 * ```tsx
 * // Mengambil angka unik
 * const angkaUnik = uniqueArray([1, 2, 2, 3, 4, 4, 1]);
 * // Hasil: [1, 2, 3, 4]
 * 
 * // Mengambil string unik
 * const kataUnik = uniqueArray(["apple", "banana", "apple"]);
 * // Hasil: ["apple", "banana"]
 * ```
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
