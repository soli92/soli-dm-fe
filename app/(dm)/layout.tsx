import { Navigation, DM_MAIN_CONTENT_PAD } from "@/components/navigation";
import { appCanvas } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export default function DmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg md:focus:left-[calc(1rem+18rem)]"
      >
        Salta al contenuto
      </a>
      <Navigation />
      <div
        id="main-content"
        className={cn(
          appCanvas,
          DM_MAIN_CONTENT_PAD,
          "motion-safe:transition-[padding] duration-200"
        )}
        tabIndex={-1}
      >
        {children}
      </div>
    </>
  );
}
