import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox"; // Import Combobox

interface VariablePanelProps {
  extractedVariables: string[];
  sessionVariables: Record<string, string>;
  onSave: (updatedVariables: Record<string, string>) => void;
}

export function VariablePanel({
  extractedVariables,
  sessionVariables,
  onSave,
}: VariablePanelProps) {
  const [variableTypes, setVariableTypes] = useState<Record<string, string>>({});

  // Define common variable type options for the Combobox
  const typeOptions = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
    { value: "object", label: "Object" },
    { value: "array", label: "Array" },
    { value: "null", label: "Null" },
    { value: "undefined", label: "Undefined" },
  ];

  // useEffect(() => {
  //   const initialTypes: Record<string, string> = {};
  //   extractedVariables.forEach((variable) => {
  //     // Ensure the initial type is one of the predefined options, or default to "string"
  //     const existingType = sessionVariables[variable];
  //     const isValidType = typeOptions.some(option => option.value === existingType);
  //     initialTypes[variable] = isValidType ? existingType : "string";
  //   });
  //   setVariableTypes(initialTypes);
  // }, [extractedVariables, sessionVariables, typeOptions]); // Add typeOptions to dependency array

  const handleTypeChange = (variableName: string, type: string) => {
    setVariableTypes((prev) => ({
      ...prev,
      [variableName]: type,
    }));
  };

  const handleSave = () => {
    onSave(variableTypes);
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Configure Template Variables</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Define the types for your template variables.
      </p>
      <div className="grid gap-4 py-4">
        {extractedVariables.length === 0 ? (
          <p className="text-muted-foreground">No variables found in the template.</p>
        ) : (
          extractedVariables.map((variable) => (
            <div key={variable} className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={variable} className="text-right col-span-2">
                {variable}
              </label>
              <Combobox // Use Combobox here
                options={typeOptions}
                value={variableTypes[variable]} // Default to "string" if not set
                onValueChange={(newValue) => handleTypeChange(variable, newValue)}
                className="col-span-2"
                placeholder="Select type"
              />
            </div>
          ))
        )}
      </div>
      {extractedVariables.length > 0 && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>
            Save changes
          </Button>
        </div>
      )}
    </div>
  );
}
