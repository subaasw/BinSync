import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "../404Page";

describe("NotFoundPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });

  it("renders the 404 text", () => {
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the heading and subtext", () => {
    expect(
      screen.getByRole("heading", { name: /oops! page not found/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /the page you're looking for seems to have been recycled or moved/i
      )
    ).toBeInTheDocument();
  });

  it("renders a 'Go Home' button linking to '/'", () => {
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders a 'Back to Dashboard' button linking to '/user/dashboard'", () => {
    const dashboardLink = screen.getByRole("link", {
      name: /back to dashboard/i,
    });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/user/dashboard");
  });
});
