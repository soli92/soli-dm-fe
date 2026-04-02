"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎲</span>
              <span className="font-bold text-lg">Soli DM</span>
            </Link>

            {user && (
              <div className="flex gap-4">
                <Link
                  href="/campaigns"
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  Campagne
                </Link>
                <Link
                  href="/characters"
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  Personaggi
                </Link>
                <Link
                  href="/dice-roller"
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  Dadi
                </Link>
                <Link
                  href="/wiki"
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  Wiki
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
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
      </div>
    </nav>
  );
}
