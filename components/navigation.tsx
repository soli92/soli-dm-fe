"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { D20Icon } from "@/components/brand/D20Icon";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/campaigns", label: "Campagne" },
  { href: "/characters", label: "Personaggi" },
  { href: "/dice-roller", label: "Dadi" },
  { href: "/wiki", label: "Wiki" },
] as const;

export function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    void logout().then(() => router.push("/"));
  };

  const linkClass = (href: string) =>
    cn(
      "relative rounded-full px-4 py-2.5 text-sm font-medium outline-none transition-colors",
      "min-h-11 inline-flex items-center justify-center sm:min-h-10 sm:py-2",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "bg-primary/15 text-foreground"
        : "text-muted-foreground hover:bg-muted/90 hover:text-foreground"
    );

  return (
    <header className="sticky top-0 z-50">
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[45] bg-foreground/40 backdrop-blur-[2px] md:hidden"
          aria-label="Chiudi menu di navigazione"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "relative z-50 border-b border-border/70 bg-card/95 shadow-md shadow-black/5 backdrop-blur-md",
          "dark:shadow-black/30 supports-[backdrop-filter]:bg-card/90"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 min-h-[3.5rem] items-center justify-between gap-3 sm:h-16 sm:min-h-[4rem]">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="group flex shrink-0 items-center gap-2.5 rounded-xl text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <D20Icon
                  decorative
                  className="h-9 w-9 drop-shadow-sm transition-transform motion-safe:group-hover:scale-105 sm:h-10 sm:w-10"
                />
                <span className="truncate font-serif text-lg font-bold tracking-tight sm:text-xl">
                  Soli DM
                </span>
              </Link>

              <nav
                className="ml-1 hidden items-center gap-0.5 md:ml-3 md:flex lg:gap-1"
                aria-label="Navigazione principale"
              >
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ThemeSwitcher />
              {user ? (
                <>
                  <span
                    className="hidden max-w-[140px] truncate text-sm text-muted-foreground lg:inline lg:max-w-[200px]"
                    title={user.email ?? undefined}
                  >
                    {user.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Esci
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn(
                      "hidden sm:inline-flex",
                      "min-h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-primary hover:bg-primary/10",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    )}
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/register"
                    className={cn(
                      "hidden sm:inline-flex",
                      "min-h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    )}
                  >
                    Registrati
                  </Link>
                </>
              )}

              <button
                type="button"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-border/80 bg-background text-foreground shadow-sm",
                  "transition-colors hover:bg-muted md:hidden",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
                aria-haspopup="true"
                onClick={() => setMobileOpen((o) => !o)}
              >
                <span className="sr-only">
                  {mobileOpen ? "Chiudi menu" : "Apri menu"}
                </span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <nav
            id="mobile-nav-menu"
            className={cn(
              "relative z-50 border-t border-border/60 py-3 md:hidden",
              mobileOpen ? "flex flex-col gap-1" : "hidden"
            )}
            aria-label="Navigazione principale"
            hidden={!mobileOpen}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(linkClass(l.href), "w-full justify-start px-4")}
              >
                {l.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-4">
                <Link
                  href="/login"
                  className={cn(
                    "flex w-full min-h-12 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary hover:bg-primary/10",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  Accedi
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    "flex w-full min-h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  Registrati
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
