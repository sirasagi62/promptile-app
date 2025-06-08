import * as React from "react";
import { VStack } from "@/components/stacks";
import { useAtom } from "jotai";
import { templateInputValuesAtom } from "@/atoms";
import Handlebars from "handlebars";

interface TemplateOutputDisplayProps {
  template: string;
}

export function TemplateOutputDisplay({ template }: TemplateOutputDisplayProps) {
  const [variableValues] = useAtom(templateInputValuesAtom);

  const processedOutput = React.useMemo(() => {
    if (!template) {
      return {
        content: "The processed template output will appear here.",
        isError: false,
      };
    }
    try {
      const compiledTemplate = Handlebars.compile(template);
      return {
        content: compiledTemplate(variableValues),
        isError: false,
      };
    } catch (error) {
      console.error("Error processing Handlebars template:", error);
      return {
        content: `Error processing template: ${error instanceof Error ? error.message : String(error)}`,
        isError: true,
      };
    }
  }, [template, variableValues]);

  return (
    <VStack className="h-full p-4 overflow-auto bg-muted/30 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Template Output</h2>
      <div
        className={`flex-1 p-2 border border-dashed rounded-md bg-background text-foreground whitespace-pre-wrap ${
          processedOutput.isError
            ? "border-red-500 text-red-500"
            : "border-muted-foreground/30"
        }`}
      >
        {processedOutput.content}
      </div>
    </VStack>
  );
}
