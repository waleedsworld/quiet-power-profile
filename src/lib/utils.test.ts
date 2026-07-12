import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    const off = "" as string | false;
    expect(cn("a", off, null, undefined, "c")).toBe("a c");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("merges conflicting tailwind classes (last wins)", () => {
    expect(cn("px-2 px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
