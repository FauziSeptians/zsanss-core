/**
 * Mengubah huruf pertama dari sebuah string teks menjadi huruf kapital (uppercase).
 *
 * Fungsi utilitas ini membaca karakter pertama dari string, mengapitalisasinya, 
 * lalu menggabungkannya kembali dengan sisa karakter dari string asli.
 * Cocok untuk menormalisasi tampilan nama atau kalimat sederhana.
 *
 * @param str - String input yang akan diproses.
 * @returns String baru di mana hanya huruf pertamanya yang berubah menjadi kapital.
 *
 * @example
 * ```tsx
 * const kataBiasa = capitalize("hello");
 * // Hasil: "Hello"
 *
 * const sudahKapital = capitalize("World");
 * // Hasil: "World"
 *
 * const kosong = capitalize("");
 * // Hasil: ""
 * ```
 */
export default function capitalize(str: string) {
  if (!str) return "";
  return str[0].toUpperCase() + str.substring(1, str.length);
}
