import { render, screen } from "@testing-library/react";
import { UserBadge } from "./UserBadge";

test("fetch user status", async () => {
  // Setup
  render(<UserBadge />);

  // Loading placeholder immediately appears
  screen.getByText("Loading...");

  // Wait for text to appear
  await screen.findByText("Active");
});
