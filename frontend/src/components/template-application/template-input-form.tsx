import { VStack } from "@/components/stacks";
import { useSession } from "@/context/session-context";
import { useMemo, useEffect } from "react";
import { useAtom } from "jotai";
import { templateInputValuesAtom } from "@/atoms";
import { StringInput } from "./input-fields/StringInput"; // Import new components
import { MultiLineStringInput } from "./input-fields/MultiLineStringInput";
import { NumberInput } from "./input-fields/NumberInput";
import { DateTimeInput } from "./input-fields/DateTimeInput";

export function TemplateInputForm() {
  const { currentSession } = useSession();
  const sessionVariables = useMemo(
    () => currentSession?.variables || {},
    [currentSession]
  );

  const [inputValues, setInputValues] = useAtom(templateInputValuesAtom);

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    Object.keys(sessionVariables).forEach((variableName) => {
      initialValues[variableName] = inputValues[variableName] || "";
    });
    setInputValues(initialValues);
  }, [sessionVariables, setInputValues]); // Added setInputValues to dependency array for completeness

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
    const value = inputValues[variableName] || "";

    switch (type) {
      case "string":
        return (
          <StringInput
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "string-multi-line":
      case "programming-language":
      case "array":
        return (
          <MultiLineStringInput
            placeholder={`Enter ${variableName} (multi-line)`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "number":
        return (
          <NumberInput
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      case "datetime":
        return (
          <DateTimeInput
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
          />
        );
      default:
        return (
          <StringInput
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
            <div key={variable} className="grid grid-cols-6 items-center gap-4">
              <label className="text-right font-bold col-span-1">
                {variable}
              </label>
              <div className="col-span-5">
                {renderInputField(variable, sessionVariables[variable])}
              </div>
            </div>
          ))
        )}
      </div>
    </VStack>
  );
}
