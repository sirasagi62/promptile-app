import { useMemo } from "react";
import { Combobox } from "@/components/ui/combobox";
import { useSession } from "@/context/session-context"; // Import useSession

export function VariablePanel() {
  const { currentSession, updateSessionVariables } = useSession(); // Get session from context
  const sessionVariables = useMemo(
    () => currentSession?.variables || {},
    [currentSession]
  ); // Derive sessionVariables

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

  const variableNames = useMemo(
    () => Object.keys(sessionVariables),
    [sessionVariables]
  );

  const handleTypeChange = (variableName: string, type: string) => {
    if (currentSession)
      updateSessionVariables(currentSession.id, {
        ...sessionVariables,
        [variableName]: type,
      });
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">
        Configure Template Variables
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Define the types for your template variables.
      </p>
      <div className="grid gap-4 py-4">
        {variableNames.length === 0 ? (
          <p className="text-muted-foreground">
            No variables found in the template.
          </p>
        ) : (
          Object.keys(sessionVariables).map((variable) => (
            <div key={variable} className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={variable} className="text-right col-span-2">
                {variable}
              </label>
              <Combobox // Use Combobox here
                options={typeOptions}
                value={sessionVariables[variable]} // Default to "string" if not set
                onValueChange={(newValue) =>
                  handleTypeChange(variable, newValue)
                }
                className="col-span-2"
                placeholder="Select type"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
