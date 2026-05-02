import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router";
import useAllPosts from "../hooks/useAllPosts";
import Post from "./Post";

vi.mock("../hooks/useAllPosts");
vi.mock("react-router");

describe("Testing Post Page", () => {
  it("renders loading text", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [],
      error: null,
      loading: true,
    });
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error text", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [],
      error: "error",
      loading: false,
    });
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    expect(
      screen.getByText("A network error was encountered"),
    ).toBeInTheDocument();
  });

  it("renders post not found", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [],
      error: null,
      loading: false,
    });
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    expect(
      screen.getByRole("heading", { name: "Post Not Found" }),
    ).toBeInTheDocument();
  });

  it("renders post correctly", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [
        {
          id: 1,
          title: "Test Title",
          datePublished: "2026-03-30T00:01:01.000Z",
          picUrl: null,
          content: "Test content text",
        },
      ],
      error: null,
      loading: false,
    });
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    const image = screen.getByAltText("blog post picture");
    const title = screen.getByRole("heading", { name: "Test Title" });
    const content = screen.getByText("Test content text");
    const details = screen.getByText(
      "Published on Mon Mar 30 2026 at 01:01:01",
    );

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });
});
