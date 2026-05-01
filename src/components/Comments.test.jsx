import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, useParams } from "react-router";
import useComments from "../hooks/useComments";
import Comments from "./Comments";
import CommentItem from "./CommentItem";

vi.mock("react-router");
vi.mock("../hooks/useComments");
vi.mock("./CommentItem");

describe("Testing Comments page", () => {
  it("renders loading text", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });
    vi.mocked(useComments).mockReturnValue({
      comments: [],
      error: null,
      loading: true,
    });

    render(<Comments />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error text", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });
    vi.mocked(useComments).mockReturnValue({
      comments: [],
      error: "error",
      loading: false,
    });

    render(<Comments />);

    expect(
      screen.getByText("A network error was encountered"),
    ).toBeInTheDocument();
  });

  it("renders comments heading", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });
    vi.mocked(useComments).mockReturnValue({
      comments: [],
      error: null,
      loading: false,
    });

    render(<Comments />);

    expect(
      screen.getByRole("heading", { name: "0 Comments" }),
    ).toBeInTheDocument();
  });

  it("renders correct number in comments heading", () => {
    vi.mocked(useParams).mockReturnValue({ postId: "1" });
    vi.mocked(useComments).mockReturnValue({
      comments: [1, 2, 3, 4],
      error: null,
      loading: false,
    });
    vi.mocked(CommentItem).mockReturnValue(<p>Mock Comment</p>);

    render(<Comments />);

    expect(
      screen.getByRole("heading", { name: "4 Comments" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Mock Comment")).toHaveLength(4);
  });
});
