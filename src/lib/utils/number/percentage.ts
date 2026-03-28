/**
 * Properti konfigurasi untuk fungsi {@link percentage}.
 */
export type PercentageProps = {
  /** Nilai bagian (numerator) yang ingin dihitung persentasenya. */
  part: number;
  /** Nilai total keseluruhan (denominator) sebagai pembagi. */
  total: number;
};

/**
 * Menghitung persentase dari sebuah nilai bagian terhadap nilai total keseluruhan.
 * 
 * Fungsi ini mengembalikan string yang sudah dilengkapi dengan simbol `%`. 
 * Dilengkapi dengan penanganan khusus jika `total` adalah `0` untuk menghindari 
 * kesalahan kalkulasi matematis (Infinity/NaN).
 * 
 * @param props - Objek yang berisi nilai `part` dan `total`.
 * @returns String representasi persentase. (Contoh: "25%").
 * 
 * @example
 * ```tsx
 * // Menghitung 20 dari 100
 * const hasil = percentage({ part: 20, total: 100 });
 * // Hasil: "20%"
 * 
 * // Penanganan total nol
 * const nol = percentage({ part: 5, total: 0 });
 * // Hasil: "0%"
 * ```
 */
export default function percentage({ part = 0, total = 0 }: PercentageProps): string {
  // Penanganan pembagian dengan nol agar tidak menghasilkan Infinity
  if (total === 0) return '0%';
  
  const res = (part / total) * 100;

  return res + '%';
}