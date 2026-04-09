"use client";

import { cn } from "@/lib/utils";
import type { AuthUser } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sizeClass = {
  sm: { root: "h-9 w-9", fallback: "text-sm" },
  md: { root: "h-11 w-11", fallback: "text-base" },
  lg: { root: "h-14 w-14", fallback: "text-lg" },
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
  const { root: dim, fallback: textSize } = sizeClass[size];

  return (
    <Avatar
      className={cn(dim, "ring-2 ring-border/80", className)}
      aria-hidden
    >
      {user.avatarUrl ? (
        <AvatarImage
          src={user.avatarUrl}
          alt=""
          referrerPolicy="no-referrer"
        />
      ) : null}
      <AvatarFallback
        delayMs={user.avatarUrl ? 50 : 0}
        className={cn(
          "bg-primary/20 font-semibold text-primary",
          textSize
        )}
      >
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}

export function userDisplayName(user: AuthUser) {
  return user.name?.trim() || user.email?.split("@")[0] || "Utente";
}
