import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, id: idProp, ...props }, ref) {
    const genId = React.useId();
    const id = idProp ?? genId;
    const errId = `${id}-error`;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium leading-none text-foreground"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className={cn(
            "min-h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base text-foreground",
            "placeholder:text-muted-foreground/80",
            "transition-[border-color,box-shadow] duration-200",
            "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={errId} className="mt-1.5 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
