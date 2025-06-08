import * as React from "react";

interface StringInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Specific props for StringInput if needed, otherwise just extend HTML input props
}

export function StringInput({ className, ...props }: StringInputProps) {
  return (
    <input
      type="text"
      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
}
