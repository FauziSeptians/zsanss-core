import arrayFrequency from "../number/array-frequency";
import { mean } from "../number/mean";
import { median } from "../number/median";
import { sum } from "../number/sum";

/**
 * Interface yang mendefinisikan operasi dasar untuk handler array angka.
 */
export interface ArrayHandlerProps {
  /** Menambahkan angka ke dalam array. */
  add: (num: number) => void;

  /** Menghapus semua angka tertentu dari array. */
  remove: (num: number) => void;

  /** Menghitung jumlah elemen dalam array. */
  count: () => number;

  /** Menghitung nilai rata-rata (mean) dari elemen array. */
  mean: () => number;

  /** Menghitung nilai tengah (median) dari elemen array. */
  median: () => number;

  /** Menghitung jumlah total (sum) dari elemen array. */
  sum: () => number;

  /** Menghitung jumlah total (sum) dari elemen array. */
  freq: (num : number) => number;

  /** Mengembalikan array saat ini. */
  result: () => number[];

  //**Mengembalikan boolean jikalau number yang dicari terdapat di array temporary */
  isExists : (num : number) => boolean; 
}

/**
 * A utility class for managing an array of numbers and performing
 * common statistical operations such as mean, median, and sum.
 *
 * This class allows:
 * - Adding and removing numbers
 * - Checking if a number exists
 * - Counting elements
 * - Calculating mean, median, and sum
 * - Retrieving the current array
 *
 * @example
 * ```ts
 * const handler = new ArrayHandler();
 * handler.add(10);
 * handler.add(20);
 * handler.add(30);
 *
 * console.log(handler.result()); 
 * // [10, 20, 30]
 *
 * console.log(handler.count()); 
 * // 3
 *
 * console.log(handler.isExists(20)); 
 * // true
 *
 * console.log(handler.mean()); 
 * // 20
 *
 * console.log(handler.median()); 
 * // 20
 *
 * console.log(handler.sum()); 
 * // 60
 *
 * handler.remove(20);
 * console.log(handler.result()); 
 * // [10, 30]
 *
 * console.log(handler.isExists(20)); 
 * // false
 * ```
 */
export class ArrayHandler implements ArrayHandlerProps {
  private array: number[] = [];

  /**
   * Checks if a given number exists in the array.
   *
   * @param num - The number to check.
   * @returns `true` if the number exists, otherwise `false`.
   */
  public isExists(num: number): boolean {
    const res = this.array.find((item) => item === num);
    return Boolean(res);
  }

  /** Adds a number to the array. */
  public add(num: number): void {
    this.array.push(num);
  }

  /** Removes all occurrences of a number from the array. */
  public remove(num: number): void {
    this.array = this.array.filter((item) => item !== num);
  }

  /** Returns the number of elements in the array. */
  public count(): number {
    return this.array.length;
  }

  /** Calculates the mean (average) of the numbers in the array. */
  public mean(): number {
    return mean(this.array);
  }

  /** Calculates the median of the numbers in the array. */
  public median(): number {
    return median(this.array);
  }

  /** Calculates the sum of the numbers in the array. */
  public sum(): number {
    return sum(this.array);
  }

  /** Calculates frequency of the search number in the array. */
  public freq(num : number) : number { 
    return arrayFrequency(this.array, num);
  }

  /** Returns the current array of numbers. */
  public result(): number[] {
    return this.array;
  }
}
