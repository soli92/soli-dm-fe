"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { D20Icon } from "@/components/brand/D20Icon";
import { UserAvatar, userDisplayName } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

/** Larghezza sidebar fissa — allineare a `md:pl-*` nel layout principale. */
export const DM_SIDEBAR_WIDTH_CLASS = "w-72";
export const DM_MAIN_CONTENT_PAD = "md:pl-72";

const NAV_LINKS = [
  { href: "/campaigns", label: "Campagne" },
  { href: "/characters", label: "Personaggi" },
  { href: "/dice-roller", label: "Dadi" },
  { href: "/wiki", label: "Wiki" },
] as const;

type SidebarNavContentProps = {
  onNavigate?: () => void;
};

function SidebarNavContent({ onNavigate }: SidebarNavContentProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    onNavigate?.();
    void logout().then(() => router.push("/"));
  };

  const linkClass = (href: string) =>
    cn(
      "relative rounded-xl px-3 py-3 text-sm font-medium outline-none transition-colors",
      "min-h-11 flex items-center gap-3",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "bg-primary/15 text-foreground"
        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
    );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-border/70 px-4 py-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <D20Icon
            decorative
            className="h-10 w-10 shrink-0 drop-shadow-sm transition-transform motion-safe:group-hover:scale-105"
          />
          <div className="min-w-0">
            <span className="block font-serif text-lg font-bold leading-tight tracking-tight">
              Soli DM
            </span>
            <span className="text-xs text-muted-foreground">Dungeon Master 5e</span>
          </div>
        </Link>
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto px-2 py-3"
        aria-label="Navigazione principale"
      >
        <ul className="flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onNavigate}
                className={linkClass(l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 space-y-4 border-t border-border/70 bg-muted/20 p-4">
        {user ? (
          <>
            <div className="flex items-start gap-3">
              <UserAvatar user={user} size="md" className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {userDisplayName(user)}
                </p>
                {user.email ? (
                  <p
                    className="truncate text-xs text-muted-foreground"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                ) : null}
              </div>
            </div>
            <ThemeSwitcher layout="stacked" />
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleLogout}
            >
              Esci
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <ThemeSwitcher layout="stacked" />
            <Link
              href="/login"
              onClick={onNavigate}
              className={cn(
                "flex min-h-11 w-full items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary hover:bg-primary/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              )}
            >
              Accedi
            </Link>
            <Link
              href="/register"
              onClick={onNavigate}
              className={cn(
                "flex min-h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              )}
            >
              Registrati
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function Navigation() {
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

  return (
    <>
      {/* Barra superiore solo mobile: logo + menu */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-card/95 shadow-sm shadow-black/5 backdrop-blur-md dark:shadow-black/25 supports-[backdrop-filter]:bg-card/90 md:hidden">
        <div className="flex h-14 min-h-[3.5rem] items-center justify-between gap-3 px-4">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-xl text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <D20Icon
              decorative
              className="h-9 w-9 shrink-0 drop-shadow-sm transition-transform motion-safe:group-hover:scale-105"
            />
            <span className="truncate font-serif text-lg font-bold tracking-tight">
              Soli DM
            </span>
          </Link>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              "border border-border/80 bg-background text-foreground shadow-sm",
              "transition-colors hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            aria-expanded={mobileOpen}
            aria-controls="dm-sidebar-nav"
            aria-haspopup="true"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">
              {mobileOpen ? "Chiudi menu" : "Apri menu di navigazione"}
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
      </header>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[45] bg-foreground/40 backdrop-blur-[2px] md:hidden"
          aria-label="Chiudi menu di navigazione"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        id="dm-sidebar-nav"
        className={cn(
          DM_SIDEBAR_WIDTH_CLASS,
          "fixed inset-y-0 left-0 z-50 flex max-w-[calc(100vw-3rem)] flex-col border-r border-border/80 bg-card shadow-xl shadow-black/10 backdrop-blur-md",
          "dark:bg-card/98 dark:shadow-black/40",
          "transition-transform duration-200 ease-out motion-reduce:transition-none",
          "md:z-40 md:max-w-none md:translate-x-0 md:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          !mobileOpen && "max-md:invisible max-md:pointer-events-none"
        )}
        aria-label="Navigazione applicazione"
      >
        <SidebarNavContent onNavigate={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
