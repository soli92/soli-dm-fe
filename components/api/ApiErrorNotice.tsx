import { appMuted } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

type ApiErrorNoticeProps = {
  message: string;
  className?: string;
};

export function ApiErrorNotice({ message, className }: ApiErrorNoticeProps) {
  return (
    <p
      className={cn(
        "rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
        className
      )}
      role="alert"
    >
      {message}
    </p>
  );
}

export function ApiErrorHint({ className }: { className?: string }) {
  return (
    <p className={cn(appMuted, "text-sm leading-relaxed", className)}>
      Se il problema persiste, il backend su Render potrebbe essere spento o non
      configurato correttamente con Supabase.
    </p>
  );
}
