import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, useOutletContext } from "react-router";
import Home from "./Home";
import HomePostItem from "../components/HomePostItem";

vi.mock("react-router");
vi.mock("../components/HomePostItem");

describe("Testing Home page", () => {
  // it("renders loading text", () => {
  //   const router = createMemoryRouter(routes, { initialEntries: ["/"] });
  //   const allPosts = [];
  //   const error = null;
  //   const loading = true;

  //   render(
  //     <RouterProvider router={router}>
  //       <Home context={[allPosts, error, loading]} />
  //     </RouterProvider>,
  //   );

  //   expect(screen.getByText("Loading...")).toBeInTheDocument();
  // });

  it("renders loading text", () => {
    vi.mocked(useOutletContext).mockReturnValue([[], null, true]);

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error text", () => {
    vi.mocked(useOutletContext).mockReturnValue([[], "error", false]);

    render(<Home />);

    expect(
      screen.getByText("A network error was encountered"),
    ).toBeInTheDocument();
  });

  it("renders correct number of children components", () => {
    vi.mocked(useOutletContext).mockReturnValue([[1, 2, 3, 4], null, false]);
    vi.mocked(HomePostItem).mockReturnValue(<p>Mock Post</p>);

    render(<Home />);

    expect(screen.getAllByText("Mock Post")).toHaveLength(4);
  });
});
