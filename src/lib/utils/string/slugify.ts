/**
 * Memanipulasi teks biasa menjadi string format `slug` yang URL-friendly.
 *
 * Utilitas ini merevolusi semua karakter ke dalam wujud huruf kecil (lowercase) 
 * sekaligus mengubah spasi whitespace biasa menjadi tanda hubung (`-`).
 * Ideal dimanfaatkan untuk standardisasi rute dari parameter judul produk atau artikel blog.
 *
 * @param str - String input murni yang bersiap diformat.
 * @returns Format identifier unik yang aman menjadi path URL (`slug`).
 *
 * @example
 * ```tsx
 * const rute1 = slugify("Hello World");
 * // Output URI: "hello-world"
 *
 * const rute2 = slugify("React Next.js Tutorial Terbaru");
 * // Output URI: "react-next.js-tutorial-terbaru"
 * ```
 */
export default function slugify(str: string) {
  return str.replaceAll(" ", "-").toLowerCase();
}
