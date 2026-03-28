/**
 * Menyamarkan (masking) bagian nama lokal dari sebuah alamat email demi privasi,
 * dengan tetap membiarkan huruf paling pertama dari nama terlihat.
 *
 * Seluruh sisa karakter sebelum lambang `@` akan diganti dengan karakter bintang (`*`).
 *
 * @param email - String alamat email utuh yang akan disamarkan.
 * @returns String format baru di mana nama pengguna telah disensor sebagian.
 *
 * @example
 * ```tsx
 * const emailAcak = maskEmail("fauzi@gmail.com");
 * // Hasil: "f****@gmail.com"
 *
 * const emailPanjang = maskEmail("john.doe@yahoo.com");
 * // Hasil: "j********@yahoo.com"
 *
 * const emailSingkat = maskEmail("a@outlook.com");
 * // Hasil: "a@outlook.com"
 * ```
 */
export default function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  const masked = "*".repeat(name.length - 1);

  return name[0] + masked + "@" + domain;
}
