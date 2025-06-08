import * as React from "react";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Specific props for NumberInput if needed
}

export function NumberInput({ className, ...props }: NumberInputProps) {
  return (
    <input
      type="number"
      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
}
