import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** elevation: 0 = flat, 1 = default card, 2 = raised */
  elevation?: 0 | 1 | 2;
}

const elevationClass = {
  0: "shadow-none",
  1: "shadow-sm shadow-black/5 dark:shadow-black/25",
  2: "shadow-md shadow-black/10 dark:shadow-black/30",
} as const;

export function Card({
  className,
  children,
  elevation = 1,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card text-card-foreground",
        elevationClass[elevation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-border/70 px-6 pb-4 pt-6 sm:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4 px-6 py-6 sm:px-8", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-border/70 px-6 py-4 sm:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
