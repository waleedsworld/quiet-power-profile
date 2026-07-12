import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./Index";
import { navItems } from "@/config/profile";

const renderIndex = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

describe("Index page (landing smoke test)", () => {
  it("renders every section that the nav links point at", () => {
    const { container } = renderIndex();
    navItems.forEach((item) => {
      const id = item.href.replace(/^#/, "");
      expect(
        container.querySelector(`#${id}`),
        `expected a section with id="${id}" for nav item "${item.label}"`
      ).not.toBeNull();
    });
  });

  it("renders a single fixed navbar header", () => {
    const { container } = renderIndex();
    expect(container.querySelectorAll("header").length).toBe(1);
  });
});
