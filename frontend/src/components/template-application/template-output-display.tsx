import * as React from "react";
import { VStack } from "@/components/stacks";
import { useAtom } from "jotai"; // Import useAtom
import { templateInputValuesAtom } from "@/atoms"; // Import the atom

interface TemplateOutputDisplayProps {
  template: string;
  // variableValues prop is no longer needed as state is managed by Jotai atom
}

export function TemplateOutputDisplay({ template }: TemplateOutputDisplayProps) {
  // Get variable values directly from the Jotai atom
  const [variableValues] = useAtom(templateInputValuesAtom);

  const processedOutput = React.useMemo(() => {
    let output = template;
    // Simple placeholder replacement for now.
    // This can be replaced with a more robust templating engine later.
    Object.entries(variableValues).forEach(([key, value]) => {
      // Replace {{variableName}} with its value
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      output = output.replace(regex, value);
    });
    return output;
  }, [template, variableValues]);

  return (
    <VStack className="h-full p-4 overflow-auto bg-muted/30 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Template Output</h2>
      <div className="flex-1 p-2 border border-dashed border-muted-foreground/30 rounded-md bg-background text-foreground whitespace-pre-wrap">
        {processedOutput || "The processed template output will appear here."}
      </div>
    </VStack>
  );
}
