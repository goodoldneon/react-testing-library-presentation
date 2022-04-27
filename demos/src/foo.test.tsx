import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("text renders", () => {
  render(<div>Hello world</div>);

  screen.getByText("Hello world");
});

test("click handler", () => {
  const spy = jest.fn();

  render(<button onClick={spy}>Accept</button>);

  const acceptButton = screen.getByText("Accept");

  fireEvent.click(acceptButton);

  expect(spy).toBeCalled();
});

test("click handler with duplicate text", async () => {
  const user = userEvent.setup();
  const spy = jest.fn();

  render(
    <div>
      <h2>Accept</h2>

      <button onClick={spy}>Accept</button>
    </div>
  );

  const acceptButton = screen.getByRole("button", { name: "Accept" });

  await userEvent.click(acceptButton);

  expect(spy).toBeCalled();
});

test("checkbox", async () => {
  const spy = jest.fn();

  render(
    <form>
      <label>
        First name
        <input />
      </label>

      <label>
        Last name
        <input />
      </label>
    </form>
  );

  const firstNameInput = assertElementType(
    screen.getByLabelText("First name"),
    HTMLInputElement
  );

  await userEvent.click(firstNameInput);
  await userEvent.keyboard("Alice");

  expect(firstNameInput.value).toBe("Alice");
});

/**
 * Ensures that an HTML element is an instance of a specific HTML element class.
 * Use generics so that the return value matches the HTML element class,
 * regardless of the element param's type.
 * @param element HTML element object
 * @param ElementClass Expected HTML element class
 * @returns element param if it's an instance of ElementClass, else raise error
 */
function assertElementType<T extends HTMLElement>(
  element: HTMLElement,
  ElementClass: { new (): T }
): T {
  if (!(element instanceof ElementClass)) {
    throw new Error(`element is not an instance of ${ElementClass.name}`);
  }

  return element;
}
