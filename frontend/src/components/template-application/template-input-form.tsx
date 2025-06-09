import { VStack } from "@/components/stacks";
import { useSession } from "@/context/session-context";
import { useMemo, useEffect } from "react";
import { useAtom } from "jotai";
import { templateInputValuesAtom, TemplateVariableData, editingVariableKeyAtom } from "@/atoms"; // Import TemplateVariableData and editingVariableKeyAtom
import { StringInput } from "./input-fields/StringInput";
import { MultiLineStringInput } from "./input-fields/MultiLineStringInput";
import { NumberInput } from "./input-fields/NumberInput";
import { DateTimeInput } from "./input-fields/DateTimeInput";
import { Combobox } from "@/components/ui/combobox"; // Import Combobox
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/lib/variable-types"; // Import programming language options

export function TemplateInputForm() {
  const { currentSession } = useSession();
  // sessionVariables stores variableName -> type (e.g., { "name": "string", "age": "number" })
  const sessionVariables = useMemo(
    () => currentSession?.variables || {},
    [currentSession]
  );

  // inputValues stores variableName -> { type: string, value: string }
  const [inputValues, setInputValues] = useAtom(templateInputValuesAtom);
  // Atom to track the currently editing variable key
  const [, setEditingVariableKey] = useAtom(editingVariableKeyAtom);

  // Initialize inputValues based on sessionVariables and existing atom state
  useEffect(() => {
    const initialValues: Record<string, TemplateVariableData> = {};
    Object.keys(sessionVariables).forEach((variableName) => {
      const variableType = sessionVariables[variableName];
      initialValues[variableName] = {
        type: variableType,
        value: inputValues[variableName]?.value || "", // Preserve existing value if available
      };
    });
    setInputValues(initialValues);
  }, [sessionVariables, setInputValues]);

  const handleInputChange = (variableName: string, newValue: string) => {
    setInputValues((prevValues) => {
      const variableType = sessionVariables[variableName]; // Get the type from sessionVariables
      return {
        ...prevValues,
        [variableName]: {
          type: variableType, // Store the type
          value: newValue,    // Store the new value
        },
      };
    });
  };

  const handleInputFocus = (variableName: string) => {
    setEditingVariableKey(variableName);
  };

  const handleInputBlur = () => {
    // Set to null when any input in this form loses focus
    // This handles tabbing between fields correctly for highlight removal.
    setEditingVariableKey(null);
  };

  const variableNames = useMemo(
    () => Object.keys(sessionVariables),
    [sessionVariables]
  );

  const renderInputField = (variableName: string, type: string) => {
    // Access the actual string value from the nested object
    const value = inputValues[variableName]?.value || "";

    const commonProps = {
      onFocus: () => handleInputFocus(variableName),
      onBlur: handleInputBlur,
    };

    switch (type) {
      case "string":
        return (
          <StringInput
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            {...commonProps}
          />
        );
      case "string-multi-line":
      case "array": // Treat array as multi-line string for now (e.g., JSON or comma-separated)
        return (
          <MultiLineStringInput
            placeholder={`Enter ${variableName} (multi-line)`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            {...commonProps}
          />
        );
      case "number":
        return (
          <NumberInput
            placeholder={`Enter ${variableName}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            {...commonProps}
          />
        );
      case "datetime":
        return (
          <DateTimeInput
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            {...commonProps}
          />
        );
      case "programming-language":
        return (
          <Combobox
            options={PROGRAMMING_LANGUAGE_OPTIONS}
            value={value}
            onValueChange={(newValue) => handleInputChange(variableName, newValue)}
            placeholder={`Select ${variableName} language`}
            className="w-full"
            {...commonProps} // Pass commonProps to Combobox
          />
        );
      default:
        return (
          <StringInput
            placeholder={`Unsupported type: ${type}`}
            value={value}
            onChange={(e) => handleInputChange(variableName, e.target.value)}
            disabled
            {...commonProps}
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
