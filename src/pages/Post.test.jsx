import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useOutletContext, useParams } from "react-router";
import Post from "./Post";

vi.mock("react-router");

const postMock = {
  id: 1,
  title: "Test Title",
  datePublished: "2026-03-30T00:01:01.000Z",
  picUrl: null,
  content: "Test content text",
};

describe("Testing Post Page", () => {
  it("renders post not found", () => {
    vi.mocked(useOutletContext).mockReturnValue([[postMock]]);
    vi.mocked(useParams).mockReturnValue({ postId: "2" });

    render(<Post />);

    expect(
      screen.getByRole("heading", { name: "Post Not Found" }),
    ).toBeInTheDocument();
  });

  it("renders post correctly", () => {
    vi.mocked(useOutletContext).mockReturnValue([[postMock]]);
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    const image = screen.getByAltText("blog post picture");
    const title = screen.getByRole("heading", { name: "Test Title" });
    const content = screen.getByText("Test content text");
    const details = screen.getByText(
      "By Mr Mine - Published on Mon Mar 30 2026 at 01:01:01",
    );

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });

  it("renders Login component when no token or not loggedIn", () => {
    vi.mocked(useOutletContext).mockReturnValue([[postMock]]);
    vi.mocked(useParams).mockReturnValue({ postId: "1" });

    render(<Post />);

    const title = screen.getByRole("heading", {
      name: "Login to post Comments",
    });

    expect(title).toBeInTheDocument();
  });

  it("renders WriteComment component when user has token", () => {
    vi.mocked(useOutletContext).mockReturnValue([[postMock]]);
    vi.mocked(useParams).mockReturnValue({ postId: "1" });
    localStorage.setItem("JWT", "test JWT");

    render(<Post />);

    const title = screen.getByRole("heading", {
      name: "Add a Comment",
    });

    expect(title).toBeInTheDocument();

    localStorage.removeItem("JWT");
  });
});
