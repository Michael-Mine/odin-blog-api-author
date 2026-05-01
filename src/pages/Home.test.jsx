import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import HomePostItem from "../components/HomePostItem";
import useAllPosts from "../hooks/useAllPosts";

vi.mock("../hooks/useAllPosts");
vi.mock("../components/HomePostItem");

describe("Testing Home page", () => {
  it("renders loading text", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [],
      error: null,
      loading: true,
    });

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error text", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [],
      error: "error",
      loading: false,
    });

    render(<Home />);

    expect(
      screen.getByText("A network error was encountered"),
    ).toBeInTheDocument();
  });

  it("renders correct number of children components", () => {
    vi.mocked(useAllPosts).mockReturnValue({
      allPosts: [1, 2, 3, 4],
      error: null,
      loading: false,
    });
    vi.mocked(HomePostItem).mockReturnValue(<p>Mock Post</p>);

    render(<Home />);

    expect(screen.getAllByText("Mock Post")).toHaveLength(4);
  });
});
