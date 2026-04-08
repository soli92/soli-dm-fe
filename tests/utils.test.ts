import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("unisce classi e risolve conflitti Tailwind (tailwind-merge)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", false && "hidden", "text-base")).toBe("text-base");
  });

  it("gestisce input vuoti", () => {
    expect(cn()).toBe("");
  });
});
