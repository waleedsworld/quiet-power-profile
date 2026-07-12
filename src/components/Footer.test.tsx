import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";
import { profile } from "@/config/profile";

describe("Footer", () => {
  it("renders as a contentinfo landmark", () => {
    // The #contact scroll target now lives on the dedicated ContactSection;
    // the footer remains the page's contentinfo landmark.
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).not.toBeNull();
  });

  it("renders the contact email as a mailto link", () => {
    render(<Footer />);
    const mailtoLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith(`mailto:${profile.email}`));
    expect(mailtoLinks.length).toBeGreaterThan(0);
  });

  it("renders the location and current year in the copyright", () => {
    render(<Footer />);
    expect(screen.getByText(profile.location)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`©\\s*${new Date().getFullYear()}`))
    ).toBeInTheDocument();
  });

  it("only renders social links that have a non-empty href", () => {
    render(<Footer />);
    // External social icons open in a new tab; mailto links do not.
    const externalLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("target") === "_blank");
    const configuredSocials = Object.values(profile.social).filter(Boolean);
    expect(externalLinks.length).toBe(configuredSocials.length);
    externalLinks.forEach((a) => {
      expect(a).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });
  });
});
