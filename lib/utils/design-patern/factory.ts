/**
 * General Factory Method
 *
 * @param type - Key untuk memilih produk
 * @param registry - Map dari key ke constructor
 * @returns Instance dari tipe sesuai key
 *
 * @example
 * ```ts
 * // Generic interface
 * interface Data<T> {
 *   getInfo(): T;
 * }
 *
 * // Implementations
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
 * // Registry
 * const schoolRegistry = {
 *   student: Student,
 *   teacher: Teacher,
 * } as const;
 *
 * // Usage
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
