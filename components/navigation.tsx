"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <span>🎲</span>
          <span>Soli DM</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/campaigns" className="hover:text-blue-400">
                Campagne
              </Link>
              <Link href="/characters" className="hover:text-blue-400">
                Personaggi
              </Link>
              <Link href="/dice-roller" className="hover:text-blue-400">
                Dadi
              </Link>
              <Link href="/wiki" className="hover:text-blue-400">
                Wiki
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link href="/register">
                <Button size="sm">Registrati</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
