import * as React from "react";
import { cn } from "@/lib/utils";

/** Campo singolo: classi input registry SoliDS + wrapper label/errore per i form app. */
const inputFieldClass = cn(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
);

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
            inputFieldClass,
            error &&
              "border-destructive focus-visible:ring-destructive/40",
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
Input.displayName = "Input";
