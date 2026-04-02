import { Navigation } from "@/components/navigation";

export default function DmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="min-h-[calc(100dvh-4rem)] bg-background text-foreground">
        {children}
      </div>
    </>
  );
}
