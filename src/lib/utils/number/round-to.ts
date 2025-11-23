/**
 * Membulatkan angka ke jumlah desimal tertentu.
 *
 * Fungsi ini menerima sebuah angka dan jumlah digit desimal,
 * lalu mengembalikan hasil pembulatan sesuai jumlah desimal tersebut.
 *
 * @param number - Angka yang ingin dibulatkan. Default = 0.
 * @param decimals - Jumlah digit desimal yang diinginkan. Default = 0.
 * @returns Angka yang sudah dibulatkan sesuai jumlah desimal.
 *
 * @example
 * // Membulatkan angka pi ke 2 desimal
 * const result1 = RoundTo({ number: 3.14159, decimals: 2 });
 * console.log(result1); // 3.14
 *
 * @example
 * // Membulatkan angka ke bilangan bulat (0 desimal)
 * const result2 = RoundTo({ number: 123.456, decimals: 0 });
 * console.log(result2); // 123
 *
 * @example
 * // Membulatkan angka ke 3 desimal
 * const result3 = RoundTo({ number: 9.8765, decimals: 3 });
 * console.log(result3); // 9.877
 *
 * @example
 * // Jika tidak ada parameter, default adalah 0
 * const result4 = RoundTo({});
 * console.log(result4); // 0
 */
export type RoundToProps = {
  number: number;
  decimals?: number;
};

export default function roundTo({ number = 0, decimals = 0 }: RoundToProps) : number {
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(number * factor) / factor;

  return rounded;
}

