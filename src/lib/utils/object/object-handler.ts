/**
 * Kelas utilitas generik untuk mempermudah manajemen suatu state objek bertipe `T`.
 * 
 * Kelas ini mendesain antarmuka perantara terpadu untuk berinteraksi dengan sebuah objek tunggal, 
 * menyediakan metode pembacaan (`get`), penggantian utuh (`set`), pembaruan spesifik satu field (`update`),
 * pembaruan gabungan massal (`bulk`), sampai dengan pengembalian state ke wujud semula (`reset`).
 *
 * @template T - Basis struktur dari kerangka skema data objek yang sedang ditangani.
 *
 * @example
 * ```tsx
 * interface ProfilPengguna {
 *   id: number;
 *   nama: string;
 *   pekerjaan: string;
 * }
 *
 * // Tentukan kerangka state profil
 * const stateProfil = new ObjectHandler<ProfilPengguna>({ 
 *   id: 0, 
 *   nama: "", 
 *   pekerjaan: "" 
 * });
 *
 * // Uji pembacaan
 * console.log(stateProfil.getObject());
 * // Output: { id: 0, nama: "", pekerjaan: "" }
 *
 * // Rubah per satu bidang (terjamin ketat Type-Safe)
 * stateProfil.updateObject("nama", "Tono");
 * 
 * // Rubah banyak data sekaligus
 * stateProfil.updateBulk({ nama: "Tini", pekerjaan: "Desainer" });
 * 
 * console.log(stateProfil.getObject());
 * // Output: { id: 0, nama: "Tini", pekerjaan: "Desainer" }
 *
 * // Hapus semua hasil modifikasi dan kembali ke status orisinil
 * stateProfil.reset();
 * ```
 */
export class ObjectHandler<T extends object> {
  private object: T;
  private initial: T;

  constructor(initial: T) {
    this.object = initial;
    this.initial = { ...initial }; // simpan salinan awal untuk reset
  }

  /** Mengembalikan bentuk seluruh susunan objek pada kondisi mutakhir. */
  public getObject(): T {
    return this.object;
  }

  /** Mengganti bersih (Replace) seluruh objek dari akar datanya menggunakan obyek baru. */
  public setObject(newObj: T): void {
    this.object = newObj;
  }

  /**
   * Mengubah susunan satu nama properti yang disasar milik suatu objek secara dinamis.
   *
   * @param key - Identitas nama properti (harus valid sebagai struktur dari `T`).
   * @param value - Konten data nilai yang disuntikkan ke sasaran properti.
   */
  public updateObject<K extends keyof T>(key: K, value: T[K]): void {
    this.object[key] = value;
  }

  /**
   * Mengintegrasikan satu grup nilai baru dari input secara massal terhadap objek bawaan.
   *
   * @param updates - Objek pelengkap transisi yang mewakili nilai baru `T`.
   */
  public updateBulk(updates: Partial<T>): void {
    this.object = { ...this.object, ...updates };
  }

  /**
   * Menetralkan kumpulan nilai perubahan.
   * Mengembalikan susunan status obyek mentah ke rekam instansiasi awalnya.
   */
  public reset(): void {
    this.object = { ...this.initial };
  }
}

