/**
 * Flattens a nested array of numbers into a single-level array.
 *
 * This function uses `Array.prototype.flat` with `Infinity` depth,
 * ensuring that all levels of nested arrays are flattened into one.
 *
 * ⚠️ Notes:
 * - Only works correctly with arrays of numbers. If the array contains
 *   non-numeric values, TypeScript typing may need to be adjusted.
 * - Very large or deeply nested arrays may impact performance.
 *
 * @param arr - A nested array of numbers to be flattened.
 * @returns A new array containing all numbers from the input, flattened into one level.
 *
 * @example
 * ```ts
 * // Flattening a simple nested array
 * const nested = [1, [2, 3], [4, [5, 6]]];
 * const flat = flattenArray(nested as unknown as number[]);
 *
 * console.log(flat);
 * // Output: [1, 2, 3, 4, 5, 6]
 * ```
 *
 * @example
 * ```ts
 * // Flattening an already flat array
 * const arr = [10, 20, 30];
 * const flat = flattenArray(arr);
 *
 * console.log(flat);
 * // Output: [10, 20, 30]
 * ```
 *
 * @example
 * ```ts
 * // Flattening deeply nested arrays
 * const deepNested = [1, [2, [3, [4, [5]]]]];
 * const flat = flattenArray(deepNested as unknown as number[]);
 *
 * console.log(flat);
 * // Output: [1, 2, 3, 4, 5]
 * ```
 */
export default function flattenArray(arr: number[]) {
  return arr.flat(Infinity);
}
