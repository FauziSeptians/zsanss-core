/**
 * Memformat angka menjadi string mata uang sesuai locale dan kode currency.
 *
 * Fungsi ini menggunakan `Intl.NumberFormat` untuk menghasilkan format
 * mata uang yang sesuai standar internasional. Locale (`code`) dan jenis
 * mata uang (`currency`) dapat disesuaikan. Jika tidak diberikan, default
 * adalah `"id-ID"` (Indonesia) dengan `"IDR"` (Rupiah).
 *
 * @param code - Locale yang digunakan untuk format angka (contoh: `"en-US"`, `"id-ID"`). Default = `"id-ID"`.
 * @param currency - Kode mata uang ISO 4217 (contoh: `"USD"`, `"EUR"`, `"IDR"`). Default = `"IDR"`.
 * @param amount - Nilai angka yang akan diformat menjadi mata uang.
 * @returns String hasil format angka dalam bentuk mata uang sesuai locale dan kode currency.
 *
 * @example
 * // Format angka 1000 ke Rupiah (Indonesia)
 * const rupiah = formatCurrency({ amount: 1000 });
 * console.log(rupiah); // "Rp1.000,00"
 *
 * @example
 * // Format angka 1234.56 ke Dollar AS
 * const usd = formatCurrency({ code: "en-US", currency: "USD", amount: 1234.56 });
 * console.log(usd); // "$1,234.56"
 *
 * @example
 * // Format angka 98765 ke Euro (Jerman)
 * const euro = formatCurrency({ code: "de-DE", currency: "EUR", amount: 98765 });
 * console.log(euro); // "98.765,00 €"
 */
export type CurrencyProps = {
  code?: string;
  currency?: string;
  amount: number;
};

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
