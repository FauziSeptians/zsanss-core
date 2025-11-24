/**
 * A generic handler class for managing an object of type T.
 * Provides methods to get, set, update (single or bulk), and reset the object.
 *
 * @typeParam T - The shape of the object being handled.
 *
 * @example
 * ```ts
 * type Student = {
 *   id: number;
 *   name: string;
 *   class: string;
 * };
 *
 * const data = new ObjectHandler<Student>({ id: 0, name: "", class: "" });
 *
 * console.log(data.getObject());
 * // { id: 0, name: "", class: "" }
 *
 * data.updateObject("name", "Alice");
 * console.log(data.getObject());
 * // { id: 0, name: "Alice", class: "" }
 *
 * data.updateBulk({ name: "Bob", class: "Math" });
 * console.log(data.getObject());
 * // { id: 0, name: "Bob", class: "Math" }
 *
 * data.reset();
 * console.log(data.getObject());
 * // { id: 0, name: "", class: "" }
 * ```
 */
export class ObjectHandler<T extends object> {
  private object: T;
  private initial: T;

  constructor(initial: T) {
    this.object = initial;
    this.initial = { ...initial }; // simpan salinan awal untuk reset
  }

  /** Returns the current object. */
  public getObject(): T {
    return this.object;
  }

  /** Replaces the object with a new one. */
  public setObject(newObj: T): void {
    this.object = newObj;
  }

  /**
   * Updates a single property of the object.
   *
   * @param key - The key of the property to update.
   * @param value - The new value for the property.
   */
  public updateObject<K extends keyof T>(key: K, value: T[K]): void {
    this.object[key] = value;
  }

  /**
   * Updates multiple properties of the object at once.
   *
   * @param updates - A partial object containing the properties to update.
   */
  public updateBulk(updates: Partial<T>): void {
    this.object = { ...this.object, ...updates };
  }

  /**
   * Resets the object back to its initial state.
   */
  public reset(): void {
    this.object = { ...this.initial };
  }
}

