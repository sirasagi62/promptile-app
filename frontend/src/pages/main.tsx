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

export function Promptile() {
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
              {/* <textarea className="w-full h-full resize-none p-2" /> */}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              Make changes to your account here.
            </ResizablePanel>
          </ResizablePanelGroup>
        </Rest>
      </VStack>
    </SidebarProvider>
  );
}
