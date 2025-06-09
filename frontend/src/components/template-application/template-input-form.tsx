import { VStack } from "@/components/stacks";
import { useSession } from "@/context/session-context";
import { useMemo, useEffect } from "react";
import { useAtom } from "jotai";
import { templateInputValuesAtom, TemplateVariableData, editingVariableKeyAtom } from "@/atoms";
import { VariableInput } from "./VariableInput"; // Import the new VariableInput component

export function TemplateInputForm() {
  const { currentSession } = useSession();
  // sessionVariables stores variableName -> TemplateVariableData (e.g., { "name": { type: "string", value: "" } })
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
    setInputValues((prevInputValues) => {
      const newValues: Record<string, TemplateVariableData> = {};
      // Iterate over variables defined in the current session
      Object.keys(sessionVariables).forEach((variableName) => {
        const sessionData = sessionVariables[variableName];
        newValues[variableName] = {
          type: sessionData.type, // Always take the type from the session definition
          value: prevInputValues[variableName]?.value || sessionData.value || "", // Prefer existing user input, then session default, then empty
        };
      });
      // Any variables in prevInputValues but not in sessionVariables will be implicitly removed
      // because we are building newValues from scratch based on sessionVariables.
      return newValues;
    });
  }, [sessionVariables, setInputValues]);


  // This handler will be passed to VariableInput
  const handleVariableDataChange = (variableName: string, newData: TemplateVariableData) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [variableName]: newData, // Directly update with the new data object
    }));
  };

  const handleInputFocus = (variableName: string) => {
    setEditingVariableKey(variableName);
  };

  const handleInputBlur = () => {
    setEditingVariableKey(null);
  };

  const variableNames = useMemo(
    () => Object.keys(sessionVariables),
    [sessionVariables]
  );

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
              <label htmlFor={`input-${variable}`} className="text-right font-bold col-span-1">
                {variable}
              </label>
              <div className="col-span-5">
                <VariableInput
                  variableName={variable}
                  data={inputValues[variable] || { type: "string", value: "" }} // Ensure data is always available
                  onChange={handleVariableDataChange}
                  onFocus={() => handleInputFocus(variable)}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </VStack>
  );
}
