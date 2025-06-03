import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  FilePlus,
  Clock,
  Trash,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";

export function PromptileSidebar() {
  const { sessions, addSession, switchSession, deleteSession } = useSession();

  const handleAddSession = () => {
    addSession("新規セッション");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="new">
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="justify-start w-full gap-2"
                    onClick={handleAddSession}
                  >
                    <FilePlus className="h-4 w-4" />
                    <span>新規作成</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>履歴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton asChild>
                    <div className="justify-start w-full gap-2">
                      <Button
                        variant="ghost"
                        className="pl-0"
                        onClick={() => switchSession(session.id)}
                      >
                        <Clock className="h-4 w-4" />
                        <span>{session.title}</span>
                      </Button>
                      <Trash
                        className="h-4 w-4 ml-auto"
                        onClick={() => {
                          deleteSession(session.id);
                        }}
                      />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
