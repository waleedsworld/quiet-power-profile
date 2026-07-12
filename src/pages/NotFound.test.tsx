import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("NotFound page", () => {
  it("renders the 404 message and a link home", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/does-not-exist"]}>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    const home = screen.getByRole("link", { name: /return to home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("logs the attempted route for observability", () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/ghost-route"]}>
        <NotFound />
      </MemoryRouter>
    );
    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining("404"),
      "/ghost-route"
    );
  });
});
