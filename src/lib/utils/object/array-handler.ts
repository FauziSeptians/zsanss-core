import arrayFrequency from "../number/array-frequency";
import { mean } from "../number/mean";
import { median } from "../number/median";
import { sum } from "../number/sum";

/**
 * Antarmuka yang mendefinisikan fungsionalitas dan operasi dasar yang wajib dimiliki 
 * oleh kelas pengelola array numerik.
 */
export interface ArrayHandlerProps {
  /** Menambahkan sebuah angka baru ke urutan paling akhir dari array. */
  add: (num: number) => void;

  /** Menghapus seluruh kemunculan angka tertentu dari dalam array. */
  remove: (num: number) => void;

  /** Menghitung jumlah total elemen (panjang) yang saat ini ada di dalam array. */
  count: () => number;

  /** Menghitung dan mengembalikan nilai rata-rata (mean) dari seluruh elemen array. */
  mean: () => number;

  /** Menghitung dan mengembalikan nilai tengah (median) dari seluruh elemen terurut. */
  median: () => number;

  /** Menghitung dan mengembalikan total kalkulasi penjumlahan (sum) dari seluruh elemen. */
  sum: () => number;

  /** Menghitung seberapa banyak (frekuensi) suatu angka muncul di dalam array. */
  freq: (num: number) => number;

  /** Mengembalikan array saat ini sebagai output untuk digunakan di luar kelas. */
  result: () => number[];

  /** Memvalidasi apakah sebuah angka eksis di dalam array bernilai `true` jika iya. */
  isExists: (num: number) => boolean; 
}

/**
 * Kelas utilitas untuk mengelola koleksi array berupa angka (numerik) secara efisien 
 * sekaligus menyediakan metode instan untuk kalkulasi statistikal dasar (mean, median, sum).
 *
 * Sangat berguna sebagai abstraksi untuk memanipulasi rentetan data angka tanpa 
 * perlu mendefinisikan logika matematika berulang secara eksternal.
 *
 * @example
 * ```tsx
 * const handler = new ArrayHandler();
 * 
 * handler.add(10);
 * handler.add(20);
 * handler.add(30);
 *
 * console.log(handler.result()); 
 * // [10, 20, 30]
 *
 * console.log(handler.mean()); 
 * // Output rata-rata: 20
 *
 * handler.remove(20);
 * console.log(handler.result()); 
 * // [10, 30]
 * ```
 */
export class ArrayHandler implements ArrayHandlerProps {
  private array: number[] = [];

  /**
   * Memeriksa keberadaan suatu angka secara spesifik di dalam array internal.
   *
   * @param num - Angka target yang dicari keberadaannya.
   * @returns Nilai `true` jika angka tersebut ditemukan, atau `false` jika tidak ada.
   */
  public isExists(num: number): boolean {
    const res = this.array.find((item) => item === num);
    return Boolean(res);
  }

  /** Menambahkan angka pada urutan paling akhir dari array internal. */
  public add(num: number): void {
    this.array.push(num);
  }

  /** Menyaring (filter) dan menghapus seluruh elemen numerik tersebut jika ditemukan. */
  public remove(num: number): void {
    this.array = this.array.filter((item) => item !== num);
  }

  /** Mengembalikan panjang atau banyaknya koleksi elemen angka di dalam array saat ini. */
  public count(): number {
    return this.array.length;
  }

  /** Menjalankan utilitas kalkulasi angka rata-rata (mean) secara terpadu mengacu ke array ini. */
  public mean(): number {
    return mean(this.array);
  }

  /** Menjalankan utilitas perhitungan titik tengah (median) data. */
  public median(): number {
    return median(this.array);
  }

  /** Menjalankan fungsi penjumlahan total (sum) berantai di seluruh isi data numerik murni saat ini. */
  public sum(): number {
    return sum(this.array);
  }

  /** Mengkalkulasi nilai frekuensi mutlak berapa kali presensi angka target ini mengulang. */
  public freq(num : number) : number { 
    return arrayFrequency(this.array, num);
  }

  /** Mengembalikan koleksi state hasil manipulasi data yang aman untuk divalidasi dan digunakan. */
  public result(): number[] {
    return this.array;
  }
}
