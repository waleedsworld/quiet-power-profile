import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount React trees between tests to avoid cross-test leakage.
afterEach(() => {
  cleanup();
});

// jsdom does not implement a spec-complete matchMedia; several components and
// hooks (Navbar breakpoint listener, reduced-motion helpers) call
// addEventListener on the returned MediaQueryList, so always install a mock
// that provides the full event API.
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})) as unknown as typeof window.matchMedia;

// scrollIntoView / scrollTo are used by the Navbar + Hero smooth-scroll flows.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
