"use client";

import { cn } from "@/lib/utils";
import type { AuthUser } from "@/hooks/useAuth";

const sizeClass = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-14 w-14 text-lg",
} as const;

export type UserAvatarProps = {
  user: AuthUser;
  size?: keyof typeof sizeClass;
  className?: string;
};

function displayLabel(user: AuthUser) {
  return user.name?.trim() || user.email?.split("@")[0] || "?";
}

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const label = displayLabel(user);
  const initial = label.charAt(0).toUpperCase();
  const dim = sizeClass[size];

  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- URL esterni da provider OAuth
      <img
        src={user.avatarUrl}
        alt=""
        className={cn(
          dim,
          "shrink-0 rounded-full object-cover ring-2 ring-border/80",
          className
        )}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={cn(
        dim,
        "flex shrink-0 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary ring-2 ring-border/80",
        className
      )}
      aria-hidden
    >
      {initial}
    </div>
  );
}

export function userDisplayName(user: AuthUser) {
  return user.name?.trim() || user.email?.split("@")[0] || "Utente";
}
