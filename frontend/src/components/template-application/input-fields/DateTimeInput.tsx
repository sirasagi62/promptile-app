import * as React from "react";

interface DateTimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Specific props for DateTimeInput if needed
}

export function DateTimeInput({ className, ...props }: DateTimeInputProps) {
  return (
    <input
      type="datetime-local"
      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
}
