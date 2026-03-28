/**
 * Memotong (truncate) wujud sebuah string teks secara statis pada panjang tertentu.
 *
 * Mekanismenya secara instan mengambil cuplikan substring mulai dari indeks terawal (kiri) 
 * hingga menyentuh batas maksimum panjang yang ditentukan oleh target. 
 * Pengecualian terjadi jika string ternyata lebih pendek dari limitasi, di mana nilai asli akan dipertahankan utuh.
 *
 * @param str - Teks rujukan masukan yang akan dipotong.
 * @param number - Batasan mutlak banyak maksimal karakter yang dibolehkan untuk ditampakkan.
 * @returns String dengan format terpotong tanpa merubah wujud struktur dasar data.
 *
 * @example
 * ```tsx
 * const cuplikan1 = truncate("Hello World Selamat Pagi", 11);
 * // Hasil: "Hello World"
 * 
 * const cuplikan2 = truncate("React", 3);
 * // Hasil: "Rea"
 *
 * // Jika target memotong lebih panjang daripada string asli
 * const cuplikan3 = truncate("Hi", 5);
 * // Hasil: "Hi"
 * ```
 */
export default function truncate(str: string, number: number) {
  return str.substring(0, number);
}
