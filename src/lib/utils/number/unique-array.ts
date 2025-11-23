/**
 * Menghapus elemen duplikat dari sebuah array dan mengembalikan array baru
 * yang hanya berisi nilai unik.
 *
 * Fungsi ini menggunakan `Set` untuk memastikan setiap elemen hanya muncul sekali.
 * Urutan elemen tetap mengikuti urutan pertama kali muncul di array.
 *
 * @param arr - Array berisi elemen-elemen (string, number, atau tipe lain yang bisa dibandingkan).
 * @returns Array baru yang berisi elemen unik tanpa duplikat.
 *
 * @example
 * // Array angka dengan duplikat
 * const numbers = uniqueArray([1, 2, 2, 3, 4, 4, 5]);
 * console.log(numbers); // [1, 2, 3, 4, 5]
 *
 * @example
 * // Array string dengan duplikat
 * const fruits = uniqueArray(["apple", "banana", "apple", "orange"]);
 * console.log(fruits); // ["apple", "banana", "orange"]
 *
 * @example
 * // Array kosong menghasilkan array kosong
 * const empty = uniqueArray([]);
 * console.log(empty); // []
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
