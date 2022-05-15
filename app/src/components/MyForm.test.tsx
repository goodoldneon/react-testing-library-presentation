import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyForm } from "./MyForm";

test("form submission", async () => {
  // Setup
  render(<MyForm />);

  // User interacts with the page
  const firstNameInput = screen.getByLabelText("First Name")
  await userEvent.click(firstNameInput);
  await userEvent.keyboard("Gordon");
  await userEvent.tab();
  await userEvent.keyboard("Freeman");
  const submitButton = screen.getByText("Submit")
  await userEvent.click(submitButton);

  // Ensure that the correct greeting appears
  screen.getByText("Hello Gordon Freeman!");
});
