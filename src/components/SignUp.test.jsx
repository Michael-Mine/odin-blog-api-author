import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";

describe("SignUp component", () => {
  it("renders heading", () => {
    render(<SignUp />);

    const title = screen.getByRole("heading", { name: "Sign Up Form" });
    expect(title).toBeInTheDocument();
  });

  it("renders heading, inputs & button", () => {
    const { container } = render(<SignUp />);

    expect(container).toMatchSnapshot();
  });

  it("all input values are updated correctly", async () => {
    const user = userEvent.setup();
    render(<SignUp />);

    const firstName = screen.getByTestId("firstName-input");
    const lastName = screen.getByTestId("lastName-input");
    const username = screen.getByTestId("username-input");
    const password = screen.getByTestId("password-input");
    const passwordCheck = screen.getByTestId("passwordCheck");

    await user.type(firstName, "Mr");
    await user.type(lastName, "Mine");
    await user.type(username, "Mr@Mine.com");
    await user.type(password, "pass");
    await user.type(passwordCheck, "pass");

    expect(firstName.value).toBe("Mr");
    expect(lastName.value).toBe("Mine");
    expect(username.value).toBe("Mr@Mine.com");
    expect(password.value).toBe("pass");
    expect(passwordCheck.value).toBe("pass");
  });

  it("Signing Up text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<SignUp />);

    const signUp = screen.getByRole("button", { name: "Sign Up" });
    await user.click(signUp);

    const signingUp = screen.getByText("Signing Up...");
    expect(signingUp).toBeInTheDocument();
  });

  it("response is rendered after successful API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "User created" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    const user = userEvent.setup();
    render(<SignUp />);

    const signUp = screen.getByRole("button", { name: "Sign Up" });
    await user.click(signUp);

    const response = screen.getByText("User created");
    expect(response).toBeInTheDocument();
  });

  it("error text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Server down" };

      return Promise.reject({
        json: () => Promise.resolve(response),
      });
    });
    const user = userEvent.setup();
    render(<SignUp />);

    const signUp = screen.getByRole("button", { name: "Sign Up" });
    await user.click(signUp);

    const response = screen.getByText("A network error was encountered");
    expect(response).toBeInTheDocument();
  });
});
