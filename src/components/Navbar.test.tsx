import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { profile, navItems } from "@/config/profile";

describe("Navbar", () => {
  beforeEach(() => {
    // clearAllMocks resets call history between tests while preserving the
    // global mock implementations installed in src/test/setup.ts (matchMedia,
    // scrollTo) that the Navbar's breakpoint + smooth-scroll effects rely on.
    vi.clearAllMocks();
  });

  it("shows the brand name and initials monogram", () => {
    render(<Navbar />);
    expect(screen.getByText(profile.initials)).toBeInTheDocument();
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });

  it("renders a button for every nav item (desktop + mobile drawer render both)", () => {
    render(<Navbar />);
    navItems.forEach((item) => {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0);
    });
  });

  it("clicking a nav link smooth-scrolls to the matching section", () => {
    const target = document.createElement("section");
    target.id = navItems[0].href.replace(/^#/, "");
    const scrollSpy = vi.fn();
    target.scrollIntoView = scrollSpy;
    document.body.appendChild(target);

    render(<Navbar />);
    fireEvent.click(screen.getAllByText(navItems[0].label)[0]);

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    target.remove();
  });

  it("brand button scrolls back to top", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Back to top"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("toggles the mobile menu open and closed", () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText("Open menu");
    fireEvent.click(toggle);
    // Once open, both the header toggle and the tap-to-dismiss backdrop expose
    // a "Close menu" accessible name, so target the header toggle specifically.
    const closeControls = screen.getAllByLabelText("Close menu");
    expect(closeControls.length).toBeGreaterThan(0);
    fireEvent.click(closeControls[0]);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
