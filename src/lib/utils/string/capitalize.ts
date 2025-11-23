/**
 * Mengubah huruf pertama dari sebuah string menjadi huruf kapital,
 * lalu menggabungkannya dengan sisa string tanpa perubahan.
 *
 * Jika string kosong, fungsi akan mengembalikan string kosong.
 *
 * @param str - String yang ingin diubah huruf pertamanya menjadi kapital.
 * @returns String baru dengan huruf pertama kapital.
 *
 * @example
 * // Mengubah huruf pertama menjadi kapital
 * const word1 = capitalize("hello");
 * console.log(word1); // "Hello"
 *
 * @example
 * // String dengan huruf pertama sudah kapital
 * const word2 = capitalize("World");
 * console.log(word2); // "World"
 *
 * @example
 * // String kosong menghasilkan string kosong
 * const empty = capitalize("");
 * console.log(empty); // ""
 */
export default function capitalize(str: string) {
  if (!str) return "";
  return str[0].toUpperCase() + str.substring(1, str.length);
}
