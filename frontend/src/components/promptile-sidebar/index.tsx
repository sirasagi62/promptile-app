import {
  FilePlus,
  MoreHorizontal,
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
import { Input } from "@/components/ui/input";
import { useSession } from "@/context/session-context";
import React, { useState } from "react";
import { HStack, Rest } from "../stacks";
import { Dialog } from "../ui/dialog";
import { EditDialog } from "@/pages/_components/edit-dialog";

export function PromptileSidebar() {
  const { sessions, addSession, switchSession, deleteSession, updateSessionTitle } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleAddSession = () => {
    addSession("新規セッション");
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChange = (session: any) => {
    setSelectedSession(session.id);
    setEditTitle(session.title);
    setOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    if (selectedSession) {
      updateSessionTitle(selectedSession, editTitle);
    }
    setOpen(false);
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
            <Input
              type="text"
              placeholder="セッションを検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            <SidebarMenu>
              {filteredSessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton asChild>
                    <HStack>
                      <Rest
                        onClick={() => switchSession(session.id)}
                        className=""
                      >
                        <div className="text-center">
                          {session.title}
                        </div>
                      </Rest>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenChange(session)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      <Trash
                        className="h-4 w-4 ml-auto"
                        onClick={() => {
                          deleteSession(session.id);
                        }}
                      />
                    </HStack>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <EditDialog open={open} setOpen={setOpen}/>
    </Sidebar>
  );
}
