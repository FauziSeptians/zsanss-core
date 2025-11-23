/**
 * Represents a user profile with basic information.
 *
 * @example
 * ```ts
 * const profile: Profile = {
 *   name: "Fauzi",
 *   age: 27,
 *   class: "12012"
 * };
 * ```
 */
export type Profile = {
  /** The user's full name */
  name: string;

  /** The user's age in years */
  age: number;

  /** The user's class identifier */
  class: string;
};

/**
 * A generic Builder class for constructing objects of type `T`.
 * 
 * This class allows setting properties incrementally and 
 * ensures type safety by enforcing keys and values from `T`.
 * 
 * @typeParam T - The object type to be built.
 *
 * @example
 * ```ts
 * import { Builder, Profile } from "./builder";
 *
 * const profile = new Builder<Profile>()
 *   .set("name", "Fauzi")
 *   .set("age", 27)
 *   .set("class", "12012")
 *   .build();
 *
 * console.log(profile);
 * // Output:
 * // {
 * //   name: "Fauzi",
 * //   age: 27,
 * //   class: "12012"
 * // }
 * ```
 */
export class Builder<T extends object> {
  private readonly data: Partial<T> = {};

  /**
   * Sets a property on the builder.
   *
   * @param key - The property key of type `T`.
   * @param value - The value corresponding to the property key.
   * @returns The current builder instance for chaining.
   *
   * @example
   * ```ts
   * const builder = new Builder<Profile>();
   * builder.set("name", "Fauzi");
   * ```
   */
  set<K extends keyof T>(key: K, value: T[K]): this {
    this.data[key] = value;
    return this;
  }

  /**
   * Builds and returns the final object of type `T`.
   *
   * @throws Error if no properties have been set.
   * @returns The constructed object of type `T`.
   *
   * @example
   * ```ts
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
