import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Mr Mine Blog API - Author Access" }),
    ).toBeInTheDocument();
  });
});
