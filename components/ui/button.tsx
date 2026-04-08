import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold",
          "motion-safe:transition-[color,background-color,box-shadow,transform] duration-200",
          "rounded-full px-5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "motion-safe:active:scale-[0.98]",
          {
            sm: "min-h-10 px-4 text-sm",
            md: "min-h-11 px-5 text-base",
            lg: "min-h-12 px-8 text-lg",
          }[size],
          {
            primary: cn(
              "bg-primary text-primary-foreground shadow-md shadow-primary/25",
              "hover:bg-primary/90 hover:shadow-lg",
              "dark:shadow-black/40"
            ),
            secondary: cn(
              "bg-secondary text-secondary-foreground shadow-sm",
              "hover:bg-secondary/85"
            ),
            outline: cn(
              "border-2 border-primary bg-transparent text-primary shadow-sm",
              "hover:bg-primary/10"
            ),
            text: "border-0 bg-transparent px-3 text-primary shadow-none hover:bg-primary/10",
          }[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
