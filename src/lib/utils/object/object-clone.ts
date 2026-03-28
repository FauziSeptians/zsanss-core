/**
 * Membuat salinan (klon) secara mendalam dari sebuah entitas objek dengan teknik serialisasi JSON.
 *
 * Pendekatan ini melakukan duplikasi obyek berjenjang (**deep clone**), yang berarti bahwa 
 * sub-objek maupun sub-array yang bersarang (nested) akan disalin ulang secara fisik sehingga 
 * tidak lagi berbagi pointer memori (reference) yang sama dengan variabel objek sumbernya.
 *
 * > [!WARNING]
 * > Karena tekniknya bergantung pada engine JSON asli browser, terdapat batasan:
 * > - Properti non-primitif khusus seperti _Function_, `Date`, `Map`, `Set`, `RegExp` 
 * >   serta nilai tipe `undefined` akan otomatis hilang atau terkonversi parsial.
 * > - Struktur objek dengan Referensi Melingkar (*Circular references*) akan memicu Error secara sekejap.
 *
 * @param object - Objek yang akan direplikasi. Pastikan berstatus murni serializable ke JSON.
 * @returns Objek turunan yang merupakan rupa salinan dari objek awal (*deep copy*).
 *
 * @example
 * ```tsx
 * const profilAsli = { 
 *   nama: "Alice", 
 *   umur: 25, 
 *   alamat: { kota: "Jakarta" } 
 * };
 *
 * const profilCopy = objectClone(profilAsli);
 *
 * // Uji coba referensi (False)
 * console.log(profilCopy === profilAsli); 
 * 
 * // Uji memori bersarang tersalin aman (False)
 * console.log(profilCopy.alamat === profilAsli.alamat); 
 * ```
 *
 * @example
 * ```tsx
 * // Membuat replika deep array berisi kumpulan object
 * const daftar = [{ id: 1 }, { id: 2 }];
 * const daftarKlon = objectClone(daftar);
 * 
 * console.log(daftarKlon[0] === daftar[0]); 
 * // Hasil: false
 * ```
 */
export default function objectClone(object: object) {
  return JSON.parse(JSON.stringify(object));
}
