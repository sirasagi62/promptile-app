import * as React from "react";
import { VStack } from "@/components/stacks";
import { useAtom } from "jotai";
import { templateInputValuesAtom, editingVariableKeyAtom } from "@/atoms";
import Handlebars from "handlebars";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react"; // Import Clipboard icon
import { processTemplateForDisplay, TemplateSegment } from "@/lib/template-utils"; // Import the new utility
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import { cn } from "@/lib/utils"; 

interface TemplateOutputDisplayProps {
  template: string;
}

export function TemplateOutputDisplay({ template }: TemplateOutputDisplayProps) {
  // Use the updated atom type
  const [variableDataMap] = useAtom(templateInputValuesAtom);
  // Read the currently editing variable key
  const [editingVariableKey] = useAtom(editingVariableKeyAtom);
  const [copyStatus, setCopyStatus] = React.useState<string>(""); // State for copy feedback

  const processedOutput = React.useMemo(() => {
    if (!template) {
      return {
        segments: [{ type: 'text', content: "The processed template output will appear here." }] as TemplateSegment[],
        plainTextContent: "The processed template output will appear here.",
        isError: false,
      };
    }

    // Transform the variableDataMap into a simple Record<string, string>
    // for Handlebars, as it only needs the string value.
    const variableValuesForHandlebars: Record<string, string> = {};
    for (const key in variableDataMap) {
      if (Object.prototype.hasOwnProperty.call(variableDataMap, key)) {
        variableValuesForHandlebars[key] = variableDataMap[key].value;
      }
    }

    try {
      const compiledTemplate = Handlebars.compile(template);
      // Trim trailing whitespace, including newlines
      const plainTextContent = compiledTemplate(variableValuesForHandlebars).trimEnd();

      // Use the new utility to get segments for display, passing the full variableDataMap
      const segments = processTemplateForDisplay(template, variableDataMap); // Changed argument here

      return {
        segments: segments,
        plainTextContent: plainTextContent,
        isError: false,
      };
    } catch (error) {
      console.error("Error processing Handlebars template:", error);
      return {
        segments: [{ type: 'text', content: `Error processing template: ${error instanceof Error ? error.message : String(error)}` }] as TemplateSegment[],
        plainTextContent: `Error processing template: ${error instanceof Error ? error.message : String(error)}`,
        isError: true,
      };
    }
  }, [template, variableDataMap]); // Depend on variableDataMap

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedOutput.plainTextContent);
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
            disabled={!processedOutput.plainTextContent || processedOutput.isError}
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
        <TooltipProvider>
          {processedOutput.segments.map((segment, index) => (
            segment.type === 'text' ? (
              <React.Fragment key={index}>{segment.content}</React.Fragment>
            ) : (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      "variable-highlight", // Base highlight style
                      segment.name === editingVariableKey && "variable-highlight-active" // Active highlight style
                    )}
                  >                    {segment.value}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {/* Display the variable name and its type */}
                  {segment.name} ({segment.variableType})
                </TooltipContent>
              </Tooltip>
            )
          ))}
        </TooltipProvider>
      </div>
    </VStack>
  );
}
