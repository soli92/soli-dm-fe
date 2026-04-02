"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    void logout().then(() => router.push("/"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          <div className="flex items-center gap-6 lg:gap-8 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-2xl" aria-hidden>
                🎲
              </span>
              <span className="font-bold text-lg font-serif">Soli DM</span>
            </Link>

            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {[
                { href: "/campaigns", label: "Campagne" },
                { href: "/characters", label: "Personaggi" },
                { href: "/dice-roller", label: "Dadi" },
                { href: "/wiki", label: "Wiki" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <ThemeSwitcher />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline max-w-[160px] lg:max-w-[200px] truncate">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrati</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
