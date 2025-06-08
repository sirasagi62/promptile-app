import * as React from "react";

interface MultiLineStringInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Specific props for MultiLineStringInput if needed
}

export function MultiLineStringInput({ className, ...props }: MultiLineStringInputProps) {
  return (
    <textarea
      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[80px]"
      {...props}
    />
  );
}
