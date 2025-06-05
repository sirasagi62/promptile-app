import React, { useState, useEffect } from "react"; // Import useState and useEffect
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useSession } from "../../context/session-context";
import { extractMustacheVariables } from "@/lib/template-utils"; // Import the utility
import { Button } from "@/components/ui/button"; // Import Button
import { VariableConfigDialog } from "./variable-config-dialog"; // Import the new dialog

export function TemplateEditor() {
  const { currentSession, updateSessionTemplate, updateSessionVariables } = useSession();
  const currentTemplate = currentSession?.template || "";
  const currentSessionVariables = currentSession?.variables || {};

  const [isVariableDialogOpened, setIsVariableDialogOpened] = useState(false);
  const [extractedVariables, setExtractedVariables] = useState<string[]>([]);

  // Effect to extract variables whenever the template changes
  useEffect(() => {
    const newExtractedVariables = extractMustacheVariables(currentTemplate);
    setExtractedVariables(newExtractedVariables);

    // Update session variables if new ones are found or old ones are removed
    const updatedSessionVariables: Record<string, string> = {};
    let changed = false;

    newExtractedVariables.forEach(variable => {
      if (currentSessionVariables[variable]) {
        updatedSessionVariables[variable] = currentSessionVariables[variable];
      } else {
        updatedSessionVariables[variable] = "string"; // Default type for new variables
        changed = true;
      }
    });

    // Check if any variables were removed from the template
    for (const key in currentSessionVariables) {
      if (!newExtractedVariables.includes(key)) {
        changed = true;
        break;
      }
    }

    if (changed && currentSession) {
      updateSessionVariables(currentSession.id, updatedSessionVariables);
    }
  }, [currentTemplate, currentSession, currentSessionVariables, updateSessionVariables]);


  const handleTemplateChange = (newTemplate: string) => {
    if (currentSession) {
      updateSessionTemplate(currentSession.id, newTemplate);
    }
  };

  const handleSaveVariableTypes = (updatedTypes: Record<string, string>) => {
    if (currentSession) {
      updateSessionVariables(currentSession.id, updatedTypes);
    }
  };

  return (
    <div className="relative h-full w-full">
      <AceEditor
        mode="handlebars"
        theme="monokai"
        onChange={handleTemplateChange}
        name="ACE_EDITOR_OF_MUSTACHE"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        showPrintMargin={false}
        value={currentTemplate}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-2 right-2 z-10"
        onClick={() => setIsVariableDialogOpened(true)}
      >
        Configure Variables
      </Button>

      <VariableConfigDialog
        open={isVariableDialogOpened}
        setOpen={setIsVariableDialogOpened}
        extractedVariables={extractedVariables}
        sessionVariables={currentSessionVariables}
        onSave={handleSaveVariableTypes}
      />
    </div>
  );
}
