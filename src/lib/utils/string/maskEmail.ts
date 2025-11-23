/**
 * Mem-mask bagian nama dari alamat email dengan tanda bintang (*),
 * sambil tetap menampilkan huruf pertama dari nama.
 *
 * Contoh: `fauzi@gmail.com` akan menjadi `f****@gmail.com`.
 *
 * @param email - Alamat email yang akan di-mask.
 * @returns String email dengan bagian nama di-mask menggunakan tanda bintang.
 *
 * @example
 * // Email dengan nama 5 huruf
 * const masked1 = maskEmail("fauzi@gmail.com");
 * console.log(masked1); // "f****@gmail.com"
 *
 * @example
 * // Email dengan nama lebih panjang
 * const masked2 = maskEmail("john.doe@yahoo.com");
 * console.log(masked2); // "j********@yahoo.com"
 *
 * @example
 * // Email dengan nama 1 huruf
 * const masked3 = maskEmail("a@outlook.com");
 * console.log(masked3); // "a@outlook.com"
 */
export default function maskEmail(email: string) {
  let [name, domain] = email.split("@");
  let masked = "*".repeat(name.length - 1);

  return name[0] + masked + "@" + domain;
}
