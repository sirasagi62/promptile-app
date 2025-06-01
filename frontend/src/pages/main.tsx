import { PromptileSidebar } from "@/components/promptile-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Header } from "@/components/promptile-header";

export function Promptile() {
  return (
    <SidebarProvider className="h-screen">
      <PromptileSidebar />
      <div className="h-full w-full flex flex-col">
        <Header />
        <SidebarTrigger />
        <ResizablePanelGroup direction="horizontal" className="h-full flex grow">
          <ResizablePanel defaultSize={50}>
            <textarea className="w-full h-full resize-none p-2 border rounded" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            Make changes to your account here.
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarProvider>
  );
}
