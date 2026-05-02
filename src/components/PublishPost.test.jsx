import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router";
import PublishPost from "./PublishPost";

vi.mock("react-router");

describe("Testing PublishPost Component", () => {
  const postMock = {
    authorId: 1,
    content: "Test content text",
    datePublished: "2026-03-30T00:01:01.000Z",
    id: 1,
    isPublished: true,
    picUrl: null,
    title: "Test Title",
  };

  it("renders button correctly", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<PublishPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Unpublish Post" });
    expect(button).toBeInTheDocument();
  });

  it("logging in text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<PublishPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Unpublish Post" });
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
    render(<PublishPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Unpublish Post" });
    await user.click(button);

    const response = screen.getByText("A network error was encountered");
    expect(response).toBeInTheDocument();
  });

  it("response text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Post updated" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<PublishPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Unpublish Post" });
    await user.click(button);

    const response = screen.getByText("Post updated");
    expect(response).toBeInTheDocument();
  });
});
