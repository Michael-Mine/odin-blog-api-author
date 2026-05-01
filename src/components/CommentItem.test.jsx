import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentItem from "./CommentItem";

describe("Testing CommentItem Component", () => {
  const commentMock = {
    id: 1,
    postId: 1,
    authorId: 3,
    author: {
      firstName: "Mr",
      lastName: "Mine",
    },
    title: "Test Title",
    date: "2026-03-30T00:01:01.000Z",
    content: "Test content text",
  };

  it("renders post prop", () => {
    render(<CommentItem comment={commentMock} />);

    const title = screen.getByText("By Mr M on Mon Mar 30 2026 at 01:01:01");
    const content = screen.getByText("Test content text");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
