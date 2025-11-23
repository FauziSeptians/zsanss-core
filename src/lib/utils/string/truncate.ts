/**
 * Memotong string hingga panjang tertentu dari awal.
 *
 * Fungsi ini menggunakan `substring` untuk mengambil bagian string
 * mulai dari indeks 0 hingga panjang yang ditentukan.
 * Jika panjang string lebih pendek dari `number`, hasilnya adalah string asli.
 *
 * @param str - String yang ingin dipotong.
 * @param number - Jumlah karakter maksimum yang akan ditampilkan.
 * @returns String yang sudah dipotong sesuai panjang yang ditentukan.
 *
 * @example
 * // Memotong string menjadi 5 karakter
 * const short1 = truncate("Hello World", 5);
 * console.log(short1); // "Hello"
 *
 * @example
 * // Memotong string menjadi 3 karakter
 * const short2 = truncate("React", 3);
 * console.log(short2); // "Rea"
 *
 * @example
 * // Jika panjang string lebih pendek dari number
 * const short3 = truncate("Hi", 5);
 * console.log(short3); // "Hi"
 */
export default function truncate(str: string, number: number) {
  return str.substring(0, number);
}
