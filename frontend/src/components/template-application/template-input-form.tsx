import * as React from "react";
import { VStack } from "@/components/stacks";
import { useSession } from "@/context/session-context";
import { useMemo, useEffect } from "react";
import { useAtom } from "jotai"; // Import useAtom
import { templateInputValuesAtom } from "@/atoms"; // Import the atom

interface TemplateInputFormProps {
  // onValuesChange prop is no longer needed as state is managed by Jotai atom
}

export function TemplateInputForm({}: TemplateInputFormProps) {
  const { currentSession } = useSession();
  const sessionVariables = useMemo(
    () => currentSession?.variables || {},
    [currentSession]
  );

  // Use Jotai atom for input values
  const [inputValues, setInputValues] = useAtom(templateInputValuesAtom);

  // Initialize inputValues when sessionVariables change
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    Object.keys(sessionVariables).forEach((variableName) => {
      // Initialize with empty string or existing value if available
      initialValues[variableName] = inputValues[variableName] || "";
    });
    setInputValues(initialValues);
  }, [sessionVariables]); // Depend on sessionVariables

  const handleInputChange = (variableName: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [variableName]: value,
    }));
  };

  const variableNames = useMemo(
    () => Object.keys(sessionVariables),
    [sessionVariables]
  );

  const renderInputField = (variableName: string, type: string) => {
    const value = inputValues[variableName] || ""; // Ensure value is always a string for input elements

    switch (type) {
      case "string":
        return (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "string-multi-line":
      case "programming-language":
      case "array":
        return (
          <textarea
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            placeholder={`Enter ${variableName} (multi-line)`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "datetime":
        return (
          <input
            type="datetime-local"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={`Unsupported type: ${type}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            disabled
          />
        );
    }
  };

  return (
    <VStack className="h-full p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Template Inputs</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Enter values for your template variables.
      </p>
      <div className="grid gap-4 py-4">
        {variableNames.length === 0 ? (
          <p className="text-muted-foreground">
            No variables found in the template.
          </p>
        ) : (
          variableNames.map((variable) => (
            <div key={variable} className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">
                {variable}
              </label>
              <div className="col-span-3">
                {renderInputField(variable, sessionVariables[variable])}
              </div>
            </div>
          ))
        )}
      </div>
    </VStack>
  );
}
