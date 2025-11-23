/**
 * Mengubah string menjadi slug yang URL-friendly.
 *
 * Fungsi ini mengganti semua spasi dengan tanda hubung (-)
 * dan mengubah seluruh huruf menjadi lowercase.
 * Cocok digunakan untuk membuat slug dari judul artikel atau nama produk.
 *
 * @param str - String yang ingin diubah menjadi slug.
 * @returns String slug yang sudah diformat.
 *
 * @example
 * // Judul artikel sederhana
 * const slug1 = slugify("Hello World");
 * console.log(slug1); // "hello-world"
 *
 * @example
 * // Judul dengan huruf kapital dan spasi
 * const slug2 = slugify("React Next.js Tutorial");
 * console.log(slug2); // "react-next.js-tutorial"
 *
 * @example
 * // String kosong menghasilkan string kosong
 * const slug3 = slugify("");
 * console.log(slug3); // ""
 */
export default function slugify(str: string) {
  return str.replaceAll(" ", "-").toLowerCase();
}
