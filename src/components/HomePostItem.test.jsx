import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePostItem from "./HomePostItem";

describe("Testing HomePostItem Component", () => {
  const postMock = {
    id: 1,
    title: "Test Title",
    datePublished: "2026-03-30T00:01:01.000Z",
    picUrl: null,
    content: "Test content text",
  };

  it("renders post prop", () => {
    render(
      <MemoryRouter>
        <HomePostItem post={postMock} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: "blog post picture Mon Mar 30 2026 Test Title Test content text...",
    });
    const date = screen.getByRole("heading", {
      name: "Mon Mar 30 2026",
    });
    const title = screen.getByRole("heading", { name: "Test Title" });
    const image = screen.getByAltText("blog post picture");
    const content = screen.getByText("Test content text...");

    expect(link).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
