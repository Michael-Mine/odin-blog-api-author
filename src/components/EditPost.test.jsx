import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router";
import EditPost from "./EditPost";

vi.mock("react-router");

describe("Testing Edit Post Component", () => {
  const postMock = {
    authorId: 1,
    content: "Test content text",
    datePublished: "2026-03-30T00:01:01.000Z",
    id: 1,
    // leave isPublished to stop successful fetch in sending text test
    picUrl: null,
    title: "Test Title",
  };

  it("renders heading, form inputs & button", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    const { container } = render(<EditPost post={postMock} />);

    expect(container).toMatchSnapshot();
  });

  it("all input values are updated correctly", async () => {
    const user = userEvent.setup();
    render(<EditPost post={postMock} />);

    const title = screen.getByTestId("title-input");
    const picURL = screen.getByTestId("picURL-input");
    const content = screen.getByTestId("content-input");

    await user.type(title, " extra");
    await user.type(picURL, "url");
    await user.type(content, " extra");

    expect(title.value).toBe("Test Title extra");
    expect(picURL.value).toBe("url");
    expect(content.value).toBe("Test content text extra");
  });

  it("sending text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<EditPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Send Edit" });
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
    render(<EditPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Send Edit" });
    await user.click(button);

    const response = screen.getByText("A network error was encountered");
    expect(response).toBeInTheDocument();
  });

  it("response text is rendered after API request", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "post updated" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<EditPost post={postMock} />);

    const button = screen.getByRole("button", { name: "Send Edit" });
    await user.click(button);

    const response = screen.getByText("post updated");
    expect(response).toBeInTheDocument();
  });
});
