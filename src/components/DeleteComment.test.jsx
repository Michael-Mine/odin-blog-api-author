import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router";
import DeleteComment from "./DeleteComment";

vi.mock("react-router");
vi.mocked(useParams).mockReturnValue({ postId: "1" });

describe("Testing DeleteComment Component", () => {
  it("renders button correctly", () => {
    render(<DeleteComment commentId={1} />);

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeInTheDocument();
  });

  it("sending text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<DeleteComment commentId={1} />);

    const button = screen.getByRole("button", { name: "Delete" });
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
    render(<DeleteComment commentId={1} />);

    const button = screen.getByRole("button", { name: "Delete" });
    await user.click(button);

    const response = screen.getByText("A network error was encountered");
    expect(response).toBeInTheDocument();
  });

  it("response text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Comment deleted" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<DeleteComment commentId={1} />);

    const button = screen.getByRole("button", { name: "Delete" });
    await user.click(button);

    const response = screen.getByText("Comment deleted");
    expect(response).toBeInTheDocument();
  });
});
