import { PromptileSidebar } from "@/components/promptile-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Promptile() {
  return (
    <SidebarProvider>
      <PromptileSidebar />
      <main>
        <SidebarTrigger />
        <Tabs defaultValue="account" className="w-full m-4">
          <TabsList>
            <TabsTrigger value="account">Generator</TabsTrigger>
            <TabsTrigger value="password">Editor</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </main>
    </SidebarProvider>
  );
}
