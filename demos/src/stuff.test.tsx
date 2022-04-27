import React, { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("text renders", () => {
  render(<div>Hello world</div>);

  screen.getByText("Hello world");
});

test("form submission", async () => {
  const onSubmit = jest.fn();

  render(<MyForm onSubmit={onSubmit} />);

  await userEvent.click(screen.getByLabelText("First Name"));
  await userEvent.keyboard("Sofia");
  await userEvent.tab();
  await userEvent.keyboard("Lamb");
  await userEvent.click(screen.getByText("Submit"));

  expect(onSubmit).toBeCalledWith({
    firstName: "Sofia",
    lastName: "Lamb",
  });
});

test("click handler", async () => {
  const spy = jest.fn();

  render(<button onClick={spy}>Accept</button>);

  await userEvent.click(screen.getByText("Accept"));

  expect(spy).toBeCalled();
});

test("click handler with duplicate text", async () => {
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

test("fetch user status", async () => {
  render(<UserBadge />);

  await screen.findByText("Active");
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

interface MyFormSubmitData {
  firstName: string;
  lastName: string;
}

interface MyFormProps {
  onSubmit: (data: MyFormSubmitData) => void;
}

function MyForm({ onSubmit }: MyFormProps): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ firstName, lastName });
      }}
    >
      <label>
        First Name
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </label>

      <label>
        Last Name
        <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}

async function fetchUserStatus(): Promise<string> {
  await sleep(200);

  return "Active";
}

function UserBadge(): JSX.Element {
  const [userStatus, setUserStatus] = useState("");

  fetchUserStatus().then(setUserStatus);

  if (userStatus === "") {
    return <div>Loading...</div>;
  }

  return <div>{userStatus}</div>;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
