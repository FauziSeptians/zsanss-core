/**
 * Menghitung nilai rata-rata (mean) dari sebuah array angka.
 * 
 * Fungsi ini menjumlahkan seluruh elemen di dalam array dan membaginya 
 * dengan total jumlah elemen tersebut.
 * 
 * @param arr - Array berisi deretan angka yang akan dihitung rata-ratanya.
 * @returns Nilai rata-rata dari elemen array. Mengembalikan `0` jika array kosong.
 * 
 * @example
 * ```tsx
 * const data = [10, 20, 30, 40];
 * const rataRata = mean(data);
 * // Hasil: 25
 * ```
 */
export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sumTotal = arr.reduce((acc, val) => acc + val, 0);

  return sumTotal / arr.length;
}
