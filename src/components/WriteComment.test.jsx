import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WriteComment from "./WriteComment";

describe("WriteComment component", () => {
  it("renders heading", () => {
    render(<WriteComment setLoggedIn={() => {}} />);

    expect(
      screen.getByRole("heading", { name: "Add a Comment" }),
    ).toBeInTheDocument();
  });

  it("renders heading, buttons, input & text", () => {
    const { container } = render(<WriteComment setLoggedIn={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  it("input value is updated correctly", async () => {
    const user = userEvent.setup();
    render(<WriteComment setLoggedIn={() => {}} />);

    const input = screen.getByRole("textbox");
    const maxText = screen.getByText("Max characters 0/400");

    await user.type(input, "Cool post");

    expect(input.value).toBe("Cool post");
    expect(maxText.textContent).toMatch("Max characters 9/400");
  });

  it("logout button calls callback", async () => {
    const setLoggedIn = vi.fn();
    const user = userEvent.setup();
    render(<WriteComment setLoggedIn={setLoggedIn} />);

    const button = screen.getByRole("button", { name: "Logout" });
    await user.click(button);

    expect(setLoggedIn).toHaveBeenCalled();
  });

  it("sending text is shown while API request is in progress", async () => {
    // window.fetch = vi.fn(() => {
    //   const response = { message: "comment created" };

    //   return Promise.resolve({
    //     json: () => Promise.resolve(response),
    //   });
    // });

    const user = userEvent.setup();
    render(<WriteComment setLoggedIn={() => {}} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const sending = screen.getByText("Sending...");
    expect(sending).toBeInTheDocument();

    // await waitForElementToBeRemoved(() => screen.queryByText("Sending..."));
  });

  it("response text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "comment created" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<WriteComment setLoggedIn={() => {}} />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const response = screen.getByText("comment created");

    expect(response).toBeInTheDocument();
  });

  it("error text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "comment created" };

      return Promise.reject({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<WriteComment setLoggedIn={() => {}} />);

    const button = screen.getByRole("button", { name: "Submit" });

    await user.click(button);

    const response = screen.getByText("A network error was encountered");

    expect(response).toBeInTheDocument();
  });
});
