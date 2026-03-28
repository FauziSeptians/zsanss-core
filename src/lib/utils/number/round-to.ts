/**
 * Properti konfigurasi untuk fungsi pembulatan {@link roundTo}.
 */
export type RoundToProps = {
  /** Angka asli yang ingin dibulatkan. */
  number: number;
  /** 
   * Jumlah digit desimal (angka di belakang koma) yang diinginkan. 
   * @default 0
   */
  decimals?: number;
};

/**
 * Membulatkan sebuah angka ke jumlah digit desimal tertentu secara akurat.
 * 
 * Sangat berguna untuk membersihkan hasil kalkulasi floating-point yang 
 * seringkali memiliki banyak digit tidak perlu di belakang koma.
 * 
 * @param props - Objek yang berisi `number` dan `decimals`.
 * @returns Hasil pembulatan dalam bentuk angka (number).
 * 
 * @example
 * ```tsx
 * // Pembulatan Pi ke 2 desimal
 * const pi = roundTo({ number: 3.14159, decimals: 2 });
 * // Hasil: 3.14
 * 
 * // Pembulatan ke bilangan bulat (default)
 * const bulat = roundTo({ number: 125.75 });
 * // Hasil: 126
 * ```
 */
export default function roundTo({ number = 0, decimals = 0 }: RoundToProps) : number {
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(number * factor) / factor;

  return rounded;
}

