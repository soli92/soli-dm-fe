import { Navigation } from "@/components/navigation";
import { appCanvas } from "@/lib/ui-classes";

export default function DmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Salta al contenuto
      </a>
      <Navigation />
      <div id="main-content" className={appCanvas} tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
