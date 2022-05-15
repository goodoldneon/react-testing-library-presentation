import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyForm } from "./MyForm";

test("form submission", async () => {
  // Setup
  render(<MyForm />);

  // User interacts with the page
  await userEvent.click(screen.getByLabelText("First Name"));
  await userEvent.keyboard("Sofia");
  await userEvent.tab();
  await userEvent.keyboard("Lamb");
  await userEvent.click(screen.getByText("Submit"));

  // Ensure that the correct greeting appears
  screen.getByText("Hello Sofia Lamb!");
});
