/**
 * Clones a given object by serializing it to JSON and then parsing it back.
 *
 * This method performs a **deep clone** of the object, meaning nested objects
 * and arrays will also be duplicated rather than referenced.
 *
 * ⚠️ Limitations:
 * - Functions, `Date`, `Map`, `Set`, `undefined`, and other non-JSON values
 *   will not be preserved correctly.
 * - Circular references will cause an error.
 *
 * @param object - The object to be cloned. Must be serializable to JSON.
 * @returns A new object that is a deep copy of the input.
 *
 * @example
 * ```ts
 * const original = { 
 *   name: "Alice", 
 *   age: 25, 
 *   address: { city: "Jakarta" } 
 * };
 *
 * const copy = ObjectClone(original);
 *
 * console.log(copy); 
 * // { name: "Alice", age: 25, address: { city: "Jakarta" } }
 *
 * console.log(copy === original); 
 * // false (different references)
 *
 * console.log(copy.address === original.address); 
 * // false (nested object also cloned)
 * ```
 *
 * @example
 * ```ts
 * // Cloning an array of objects
 * const arr = [{ id: 1 }, { id: 2 }];
 * const clonedArr = ObjectClone(arr);
 *
 * console.log(clonedArr); 
 * // [ { id: 1 }, { id: 2 } ]
 *
 * console.log(clonedArr === arr); 
 * // false
 * ```
 */
export default function objectClone(object: object) {
  return JSON.parse(JSON.stringify(object));
}
