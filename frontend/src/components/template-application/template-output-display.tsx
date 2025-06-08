import * as React from "react";
import { VStack } from "@/components/stacks";
import { useAtom } from "jotai";
import { templateInputValuesAtom } from "@/atoms";
import Handlebars from "handlebars";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react"; // Import Clipboard icon

interface TemplateOutputDisplayProps {
  template: string;
}

export function TemplateOutputDisplay({ template }: TemplateOutputDisplayProps) {
  const [variableValues] = useAtom(templateInputValuesAtom);
  const [copyStatus, setCopyStatus] = React.useState<string>(""); // State for copy feedback

  const processedOutput = React.useMemo(() => {
    if (!template) {
      return {
        content: "The processed template output will appear here.",
        isError: false,
      };
    }
    try {
      const compiledTemplate = Handlebars.compile(template);
      // Trim trailing whitespace, including newlines
      const content = compiledTemplate(variableValues).trimEnd();
      return {
        content: content,
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedOutput.content);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatus("Failed to copy!");
      setTimeout(() => setCopyStatus(""), 2000); // Clear message after 2 seconds
    }
  };

  return (
    <VStack className="h-full p-4 overflow-auto bg-muted/30 rounded-md">
      <div className="flex items-center justify-between mb-4"> {/* Flex container for heading and button */}
        <h2 className="text-lg font-semibold">Template Output</h2>
        <div className="flex items-center gap-2">
          {copyStatus && (
            <span className="text-sm text-muted-foreground">
              {copyStatus}
            </span>
          )}
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon" // Use icon size
            disabled={!processedOutput.content || processedOutput.isError}
          >
            <Clipboard className="h-4 w-4" /> {/* Clipboard icon */}
          </Button>
        </div>
      </div>
      <div
        className={`flex-1 p-2 border border-dashed rounded-md bg-background text-foreground whitespace-pre-wrap overflow-auto ${
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
