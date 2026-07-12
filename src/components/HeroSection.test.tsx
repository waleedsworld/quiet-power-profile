import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { profile } from "@/config/profile";

describe("HeroSection", () => {
  it("renders each headline line", () => {
    render(<HeroSection />);
    profile.headline.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  it("renders the availability badge and subtitle", () => {
    render(<HeroSection />);
    expect(screen.getByText(profile.availability)).toBeInTheDocument();
    expect(screen.getByText(profile.subtitle)).toBeInTheDocument();
  });

  it("renders every hero stat value and label", () => {
    render(<HeroSection />);
    profile.heroStats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("has primary and secondary call-to-action buttons that scroll on click", () => {
    const contact = document.createElement("section");
    contact.id = "contact";
    const portfolio = document.createElement("section");
    portfolio.id = "portfolio";
    const contactSpy = vi.fn();
    const portfolioSpy = vi.fn();
    contact.scrollIntoView = contactSpy;
    portfolio.scrollIntoView = portfolioSpy;
    document.body.append(contact, portfolio);

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: /book a strategy call/i }));
    fireEvent.click(screen.getByRole("button", { name: /view my work/i }));

    expect(contactSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(portfolioSpy).toHaveBeenCalledWith({ behavior: "smooth" });
    contact.remove();
    portfolio.remove();
  });
});
