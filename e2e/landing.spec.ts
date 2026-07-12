import { test, expect } from "@playwright/test";

// These mirror the visitor-facing values in src/config/profile.ts. Kept inline
// so the e2e suite exercises the real built bundle without importing app code.
const NAME = "Adrian Cole";
const HEADLINE = ["BUILDING", "THE FUTURE", "OF TECH"];
const NAV = ["Journey", "Media", "Portfolio", "Skills", "Contact"];
const SECTION_IDS = ["journey", "media", "portfolio", "skills", "contact"];

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with the correct document title", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test("renders the hero headline and brand", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    for (const line of HEADLINE) {
      await expect(heading).toContainText(line);
    }
    await expect(page.getByText(NAME).first()).toBeVisible();
  });

  test("shows a primary call-to-action button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /book a strategy call/i })
    ).toBeVisible();
  });

  test("has every navigable section present in the DOM", async ({ page }) => {
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("navbar exposes all nav links", async ({ page }) => {
    for (const label of NAV) {
      await expect(page.getByRole("button", { name: label }).first()).toBeVisible();
    }
  });

  test("clicking a nav link scrolls the target section into view", async ({ page }) => {
    await page.getByRole("button", { name: "Portfolio" }).first().click();
    const portfolio = page.locator("#portfolio");
    await expect(portfolio).toBeInViewport({ timeout: 5_000 });
  });

  test("footer contact section has a mailto link", async ({ page }) => {
    const mailto = page.locator('a[href^="mailto:"]').first();
    await expect(mailto).toHaveAttribute("href", /^mailto:.+@.+/);
  });
});

test("unknown routes render the 404 page", async ({ page }) => {
  await page.goto("/definitely-not-a-real-route");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByRole("link", { name: /return to home/i })).toBeVisible();
});
