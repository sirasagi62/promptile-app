import React, { useState, useEffect } from "react";
import { PromptileSidebar } from "@/components/promptile-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Header } from "@/components/promptile-header";
import { VStack, Rest } from "@/components/stacks";
import { TemplateEditor } from "@/components/template-editor";
import { VariablePanel } from "@/components/template-editor/variable-panel";
import { useSession } from "@/context/session-context";
import { extractMustacheVariables } from "@/lib/template-utils";

export function Promptile() {
  const { currentSession, updateSessionTemplate, updateSessionVariables } = useSession();
  const currentTemplate = currentSession?.template || "";
  const currentSessionVariables = currentSession?.variables || {};

  const [extractedVariables, setExtractedVariables] = useState<string[]>([]);

  // Effect to extract variables whenever the template changes
  // This logic is now centralized in main.tsx
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


  const handleSaveVariableTypes = (updatedTypes: Record<string, string>) => {
    if (currentSession) {
      updateSessionVariables(currentSession.id, updatedTypes);
    }
  };

  return (
    <SidebarProvider className="h-screen">
      <PromptileSidebar />
      <VStack className="w-full">
        <Header />
        <Rest>
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50}>
              <div className="bg-[#272822] p-2 h-full">
                <TemplateEditor />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <VariablePanel
                extractedVariables={extractedVariables}
                sessionVariables={currentSessionVariables}
                onSave={handleSaveVariableTypes}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Rest>
      </VStack>
    </SidebarProvider>
  );
}
