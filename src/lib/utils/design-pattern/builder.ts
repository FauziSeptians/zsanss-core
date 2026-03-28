/**
 * Representasi profil pengguna dengan informasi dasar.
 *
 * @example
 * ```tsx
 * const profile: Profile = {
 *   name: "Fauzi",
 *   age: 27,
 *   class: "12012"
 * };
 * ```
 */
export type Profile = {
  /** Nama lengkap pengguna. */
  name: string;

  /** Usia pengguna dalam tahun. */
  age: number;

  /** Identifikasi kelas atau grup pengguna. */
  class: string;
};

/**
 * Kelas Builder generik untuk mengonstruksi objek bertipe `T`.
 * 
 * Kelas ini memungkinkan pengaturan properti secara bertahap (incremental) dan 
 * menjamin keamanan tipe (type safety) dengan validasi key dan value dari `T`.
 * 
 * @template T - Tipe objek yang akan dibangun. Harus berupa objek.
 *
 * @example
 * ```tsx
 * import { Builder, Profile } from "./builder";
 *
 * const profile = new Builder<Profile>()
 *   .set("name", "Fauzi")
 *   .set("age", 27)
 *   .set("class", "12012")
 *   .build();
 *
 * console.log(profile);
 * // Output: { name: "Fauzi", age: 27, class: "12012" }
 * ```
 */
export class Builder<T extends object> {
  private readonly data: Partial<T> = {};

  /**
   * Menetapkan nilai untuk properti tertentu pada builder.
   *
   * @param key - Nama properti dari tipe `T`.
   * @param value - Nilai yang sesuai dengan properti tersebut.
   * @returns Instance builder saat ini untuk mendukung method chaining.
   *
   * @example
   * ```tsx
   * const builder = new Builder<Profile>();
   * builder.set("name", "Fauzi");
   * ```
   */
  set<K extends keyof T>(key: K, value: T[K]): this {
    this.data[key] = value;
    return this;
  }

  /**
   * Membangun dan mengembalikan objek akhir bertipe `T`.
   *
   * @throws {Error} Jika tidak ada properti yang diatur di dalam builder.
   * @returns Objek yang telah dikonstruksi dengan tipe `T`.
   *
   * @example
   * ```tsx
   * const profile = new Builder<Profile>()
   *   .set("name", "Fauzi")
   *   .set("age", 27)
   *   .set("class", "12012")
   *   .build();
   * ```
   */
  build(): T {
    if (Object.keys(this.data).length === 0) {
      throw new Error("No properties set in builder");
    }
    return this.data as T;
  }
}
