/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fungsi Factory Method generik untuk menginstansiasi objek berdasarkan key.
 * 
 * Fungsi ini mengambil `type` sebagai kunci dan `registry` yang berisi pemetaan 
 * antara kunci dengan konstruktor (class), lalu mengembalikan instance baru dari class tersebut.
 *
 * @template R - Tipe Registry yang merupakan objek dengan key string dan value berupa konstruktor.
 * @template K - Key valid yang tersedia di dalam Registry `R`.
 * 
 * @param type - Kunci untuk memilih produk (class) yang ingin diinstansiasi.
 * @param registry - Objek yang memetakan kunci ke konstruktor class.
 * @returns Instance dari class yang sesuai dengan kunci `type`.
 * @throws {Error} Jika kunci `type` tidak ditemukan di dalam `registry`.
 *
 * @example
 * ```tsx
 * // 1. Definisikan Interface
 * interface Data<T> {
 *   getInfo(): T;
 * }
 *
 * // 2. Implementasi Class
 * class Student implements Data<{ name: string }> {
 *   getInfo() {
 *     return { name: "Fauzi" };
 *   }
 * }
 *
 * class Teacher implements Data<{ subject: string }> {
 *   getInfo() {
 *     return { subject: "Math" };
 *   }
 * }
 *
 * // 3. Registry
 * const schoolRegistry = {
 *   student: Student,
 *   teacher: Teacher,
 * } as const;
 *
 * // 4. Penggunaan
 * const student = factory("student", schoolRegistry);
 * console.log(student.getInfo()); // { name: "Fauzi" }
 *
 * const teacher = factory("teacher", schoolRegistry);
 * console.log(teacher.getInfo()); // { subject: "Math" }
 * ```
 */
export default function factory<
  R extends Record<string, new (...args: any[]) => any>,
  K extends keyof R
>(type: K, registry: R): InstanceType<R[K]> {
  const ctor = registry[type];
  if (!ctor) throw new Error(`Unknown type: ${String(type)}`);
  return new ctor();
}
