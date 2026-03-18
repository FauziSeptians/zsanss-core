/**
 * Properti untuk konfigurasi fungsi {@link percentage}.
 */
export type PercentageProps = {
  /** Nilai bagian yang ingin dihitung persentasenya. */
  part: number;
  /** Nilai total keseluruhan sebagai pembagi. */
  total: number;
};

/**
 * Menghitung persentase dari sebuah bagian terhadap nilai total.
 * * Fungsi ini mengembalikan string dengan simbol `%`. Jika nilai `total` adalah `0`, 
 * fungsi akan secara otomatis mengembalikan `"0%"` untuk menghindari error pembagian nol (Infinity/NaN).
 * * @param props - Objek berisi `part` dan `total`.
 * @returns String representasi persentase (Contoh: "50%").
 * * @example
 * ```typescript
 * const result = percentage({ part: 20, total: 100 });
 * // result: "20%"
 * * const half = percentage({ part: 5, total: 10 });
 * // result: "50%"
 * ```
 */
export default function percentage({ part = 0, total = 0 }: PercentageProps): string {
  // Penanganan pembagian dengan nol agar tidak menghasilkan Infinity
  if (total === 0) return '0%';
  
  const res = (part / total) * 100;

  return res + '%';
}