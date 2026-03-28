/**
 * Objek properti untuk konfigurasi fungsi {@link formatCurrency}.
 */
export type CurrencyProps = {
  /** 
   * Locale yang digunakan untuk menentukan pemisah ribuan dan desimal (misal: "id-ID", "en-US").
   * @default "id-ID"
   */
  code?: string;
  /** 
   * Kode mata uang ISO 4217 (misal: "IDR", "USD", "EUR").
   * @default "IDR"
   */
  currency?: string;
  /** Nilai numerik nominal uang yang akan diformat. */
  amount: number;
};

/**
 * Memformat angka menjadi string mata uang yang rapi sesuai locale dan kode currency.
 * 
 * Fungsi ini menggunakan API bawaan browser `Intl.NumberFormat` untuk menghasilkan 
 * format mata uang yang sesuai standar internasional secara akurat.
 * 
 * @param props - Objek berisi `amount`, `code`, dan `currency`.
 * @returns String hasil format mata uang lengkap dengan simbol dan pemisah.
 * 
 * @example
 * ```tsx
 * // Format ke Rupiah (Indonesia)
 * const rupiah = formatCurrency({ amount: 1250000 });
 * console.log(rupiah); // "Rp1.250.000,00"
 * 
 * // Format ke Dollar AS
 * const usd = formatCurrency({ amount: 50.5, code: "en-US", currency: "USD" });
 * console.log(usd); // "$50.50"
 * ```
 */
export default function formatCurrency({
  code = "id-ID",
  currency = "IDR",
  amount = 0,
}: CurrencyProps) {
  const formatter = new Intl.NumberFormat(code, {
    style: "currency",
    currency,
  });

  return formatter.format(amount);
}
