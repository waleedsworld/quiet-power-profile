import { describe, it, expect } from "vitest";
import { profile, navItems } from "./profile";

describe("profile config", () => {
  it("exposes core identity fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.role).toBeTruthy();
    expect(profile.initials).toBeTruthy();
  });

  it("derives initials that are short and uppercase", () => {
    expect(profile.initials.length).toBeGreaterThanOrEqual(1);
    expect(profile.initials.length).toBeLessThanOrEqual(3);
    expect(profile.initials).toBe(profile.initials.toUpperCase());
  });

  it("has a three-line stacked headline (component renders exactly 3 lines)", () => {
    expect(profile.headline).toHaveLength(3);
    profile.headline.forEach((line) => expect(line.trim()).not.toBe(""));
  });

  it("has a valid contact email", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("provides at least one hero stat, each with value + label", () => {
    expect(profile.heroStats.length).toBeGreaterThan(0);
    profile.heroStats.forEach((stat) => {
      expect(stat.value.trim()).not.toBe("");
      expect(stat.label.trim()).not.toBe("");
    });
  });

  it("only contains http(s) or empty social URLs", () => {
    Object.values(profile.social).forEach((url) => {
      if (url) expect(url).toMatch(/^https?:\/\//);
    });
  });
});

describe("navItems", () => {
  it("is non-empty and every entry has label + href", () => {
    expect(navItems.length).toBeGreaterThan(0);
    navItems.forEach((item) => {
      expect(item.label.trim()).not.toBe("");
      expect(item.href).toMatch(/^#/);
    });
  });

  it("has unique hrefs", () => {
    const hrefs = navItems.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  // The Index page wires each nav href to a section `id`. If someone adds a
  // nav item without a matching section (or renames a section), smooth-scroll
  // navigation silently breaks — this guards that contract.
  it("every nav href targets a section id that exists in the app", () => {
    const sectionIds = ["journey", "media", "portfolio", "skills", "contact"];
    navItems.forEach((item) => {
      expect(sectionIds).toContain(item.href.replace(/^#/, ""));
    });
  });
});
