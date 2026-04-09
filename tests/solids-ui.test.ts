import { describe, it, expect } from "vitest";
import { buttonVariants } from "@/components/ui/button";
import { solidsNativeSelectTrigger } from "@/lib/solids-native-classes";
import { appSelectField } from "@/lib/ui-classes";

describe("SoliDS-aligned UI", () => {
  it("buttonVariants default usa token primary (registry solids/button)", () => {
    const c = buttonVariants();
    expect(c).toContain("bg-primary");
    expect(c).toContain("rounded-md");
  });

  it("buttonVariants outline usa border-input", () => {
    const c = buttonVariants({ variant: "outline" });
    expect(c).toContain("border-input");
    expect(c).toContain("bg-background");
  });

  it("solidsNativeSelectTrigger allinea a SelectTrigger (border-input, ring)", () => {
    expect(solidsNativeSelectTrigger).toContain("border-input");
    expect(solidsNativeSelectTrigger).toContain("focus-visible:ring-ring");
    expect(solidsNativeSelectTrigger).toContain("rounded-md");
  });

  it("appSelectField estende il trigger nativo SoliDS", () => {
    expect(appSelectField).toContain("border-input");
    expect(appSelectField).toContain("min-h-10");
  });
});
