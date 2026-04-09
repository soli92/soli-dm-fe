import * as React from "react";
import { cn } from "@/lib/utils";

const textareaFieldClass = cn(
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Campo testo multilinea: markup registry SoliDS + label/errore come `Input`. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, className, id: idProp, ...props }, ref) {
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
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className={cn(
            textareaFieldClass,
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
Textarea.displayName = "Textarea";
