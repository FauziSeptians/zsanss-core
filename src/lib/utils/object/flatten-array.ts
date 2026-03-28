/**
 * Meratakan (flatten) array bersarang yang berisi deretan angka menjadi satu tingkat dimensi.
 *
 * Fungsi ini memanfaatkan antarmuka `Array.prototype.flat` dengan parameter `Infinity`,
 * memastikan bahwa semua hierarki array bersarang dapat terurai secara utuh menjadi satu level.
 *
 * > [!WARNING]
 * > - Direkomendasikan khusus hanya beroperasi pada array berisi nilai numerik murni.
 * > - Jika terdapat array dengan muatan `any` yang kompleks, TypeScript mungkin membutuhkan penyesuaian.
 * > - Array yang sangat besar dimensinya berpotensi memberikan gangguan minor terhadap *performance*.
 *
 * @param arr - Array bersarang numerik (Nested array of numbers) yang akan dimanipulasi.
 * @returns Array dimensi tunggal yang memuat kumpulan angka utuh yang dijamin tak lagi bersarang.
 *
 * @example
 * ```tsx
 * // Meratakan tipe data bersarang simpel
 * const barisNested = [1, [2, 3], [4, [5, 6]]];
 * const arrayRata = flattenArray(barisNested as unknown as number[]);
 * // Output array: [1, 2, 3, 4, 5, 6]
 * 
 * // Menggunakan array yang cukup dalam bersarangnya
 * const dalam = [1, [2, [3, [4, [5]]]]];
 * const rata = flattenArray(dalam as unknown as number[]);
 * // Output array: [1, 2, 3, 4, 5]
 * ```
 */
export default function flattenArray(arr: number[]) {
  return arr.flat(Infinity);
}
