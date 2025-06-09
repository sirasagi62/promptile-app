import { useMemo } from "react";
import { Combobox } from "@/components/ui/combobox";
import { useSession } from "@/context/session-context"; // Import useSession
import { VARIABLE_TYPE_OPTIONS, VariableTypeName } from "@/lib/variable-types"; // Import from centralized types
import { TemplateVariableData } from "@/atoms"; // Import TemplateVariableData
import { useTranslation } from "react-i18next"; // Import useTranslation

export function VariablePanel() {
  const { t } = useTranslation(); // Initialize useTranslation
  const { currentSession, updateSessionVariables } = useSession(); // Get session from context
  const sessionVariables = useMemo(
    () => currentSession?.variables || {},
    [currentSession]
  ); // Derive sessionVariables

  const variableNames = useMemo(
    () => Object.keys(sessionVariables),
    [sessionVariables]
  );

  const handleTypeChange = (variableName: string, newType: VariableTypeName) => {
    if (currentSession) {
      const currentVariableData: TemplateVariableData = sessionVariables[variableName] || { type: "string", value: "" };
      const updatedVariables = {
        ...sessionVariables,
        [variableName]: {
          ...currentVariableData, // Preserve existing value
          type: newType, // Update the type
        },
      };
      updateSessionVariables(currentSession.id, updatedVariables);
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">
        {t('variablePanel.title')}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {t('variablePanel.description')}
      </p>
      <div className="grid gap-4 py-4">
        {variableNames.length === 0 ? (
          <p className="text-muted-foreground">
            {t('variablePanel.noVariables')}
          </p>
        ) : (
          Object.keys(sessionVariables).map((variable) => (
            <div key={variable} className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">
                {variable}
              </label>
              <Combobox // Use Combobox here
                options={VARIABLE_TYPE_OPTIONS} // Use the imported options
                value={sessionVariables[variable]?.type || "string"} // Access the 'type' property
                onValueChange={(newValue) =>
                  handleTypeChange(variable, newValue as VariableTypeName) // Cast to VariableTypeName
                }
                className="col-span-3"
                placeholder={t('variablePanel.selectTypePlaceholder')}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
