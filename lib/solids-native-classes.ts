import { cn } from "@/lib/utils";

/**
 * Stile `<select>` nativo allineato a SelectTrigger del registry SoliDS (border-input, ring, shadow-sm).
 */
export const solidsNativeSelectTrigger = cn(
  "flex w-full cursor-pointer appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50"
);
