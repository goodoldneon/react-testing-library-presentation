/**
 * Ensures that an HTML element is an instance of a specific HTML element class.
 * Use generics so that the return value matches the HTML element class,
 * regardless of the element param's type.
 * @param element HTML element object
 * @param ElementClass Expected HTML element class
 * @returns element param if it's an instance of ElementClass, else raise error
 */
export function assertElementType<T extends HTMLElement>(
  element: HTMLElement,
  ElementClass: { new (): T }
): T {
  if (!(element instanceof ElementClass)) {
    throw new Error(`element is not an instance of ${ElementClass.name}`);
  }

  return element;
}
