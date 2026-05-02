import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPost from "./NewPost";

describe("Testing New Post Page", () => {
  it("renders heading, form inputs & button", () => {
    const { container } = render(<NewPost />);

    expect(container).toMatchSnapshot();
  });

  it("all input values are updated correctly", async () => {
    const user = userEvent.setup();
    render(<NewPost />);

    const title = screen.getByTestId("title-input");
    const picURL = screen.getByTestId("picURL-input");
    const content = screen.getByTestId("content-input");

    await user.type(title, "title test");
    await user.type(picURL, "url");
    await user.type(content, "blogging");

    expect(title.value).toBe("title test");
    expect(picURL.value).toBe("url");
    expect(content.value).toBe("blogging");
  });

  it("sending text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<NewPost />);

    const button = screen.getByRole("button", { name: "Add Post" });
    await user.click(button);

    const sending = screen.getByText("Sending...");
    expect(sending).toBeInTheDocument();
  });

  it("error text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Error 500" };

      return Promise.reject({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<NewPost />);

    const button = screen.getByRole("button", { name: "Add Post" });
    await user.click(button);

    const response = screen.getByText("A network error was encountered");
    expect(response).toBeInTheDocument();
  });

  it("response text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "post created" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<NewPost />);

    const button = screen.getByRole("button", { name: "Add Post" });
    await user.click(button);

    const response = screen.getByText("post created");
    expect(response).toBeInTheDocument();
  });
});
