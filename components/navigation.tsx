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

  const handleLogout = () => {
    void logout().then(() => router.push("/"));
  };

  const linkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "bg-primary/15 text-foreground"
        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/75">
      <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 min-h-[3.5rem] items-center justify-between gap-3 sm:h-16 sm:min-h-[4rem]">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 rounded-lg text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <D20Icon
                decorative
                className="h-9 w-9 drop-shadow-sm transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
              />
              <span className="truncate font-serif text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Soli DM
              </span>
            </Link>

            <nav
              className="ml-2 hidden items-center gap-1 md:ml-4 md:flex lg:gap-2"
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
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="hidden sm:block">
                  <Button size="sm">Registrati</Button>
                </Link>
              </>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm hover:bg-muted md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">
                {mobileOpen ? "Chiudi menu" : "Apri menu"}
              </span>
              <svg
                className="h-5 w-5"
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
            "border-t border-border/80 py-3 md:hidden",
            mobileOpen ? "flex flex-col gap-1" : "hidden"
          )}
          aria-label="Navigazione principale"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(linkClass(l.href), "px-4 py-3")}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3 sm:hidden">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="w-full">
                  Registrati
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
