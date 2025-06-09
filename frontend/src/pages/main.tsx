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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TemplateInputForm } from "@/components/template-application/template-input-form";
import { TemplateOutputDisplay } from "@/components/template-application/template-output-display";
import { useSession } from "@/context/session-context";
import { useTranslation } from "react-i18next";
// No need to import useState here anymore for templateInputValues

export function Promptile() {
  const { t } = useTranslation(); // Initialize useTranslation
  
  const { currentSession } = useSession();
  const currentTemplate = currentSession?.template || "";

  // templateInputValues state and handler are no longer managed here,
  // they are managed by the Jotai atom directly within the components.

  return (
    <SidebarProvider className="h-screen">
      <PromptileSidebar />
      <VStack className="w-full">
        <Header />
        <Rest>
          <Tabs defaultValue="templates" className="h-full w-full flex flex-col">
            <TabsList className="w-fit">
              <TabsTrigger value="edit">{t("mainPage.edit")}</TabsTrigger>
              <TabsTrigger value="templates">{t("mainPage.template")}</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="flex-1">
              <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel defaultSize={50}>
                  <div className="bg-[#272822] p-2 h-full">
                    <TemplateEditor />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <VariablePanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
            <TabsContent value="templates" className="flex-1">
              <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel defaultSize={50}>
                  <TemplateInputForm /> 
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <TemplateOutputDisplay
                    template={currentTemplate}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
          </Tabs>
        </Rest>
      </VStack>
    </SidebarProvider>
  );
}
