import { FilePlus, MoreHorizontal, Trash } from "lucide-react";

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
import { EditDialog } from "@/components/promptile-sidebar/_components/edit-dialog";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components

export function PromptileSidebar() {
  const { t } = useTranslation();
  const {
    sessions,
    addSession,
    switchSession,
    deleteSession,
    updateSessionTitle,
  } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false); // State for edit dialog
  const [selectedSession, setSelectedSession] = useState<string | null>(null); // State for session being edited
  const [editTitle, setEditTitle] = useState(""); // State for edit dialog input

  // New states for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDeleteId, setSessionToDeleteId] = useState<string | null>(null);

  const handleAddSession = () => {
    addSession(t('sidebar.newSessionDefaultTitle'));
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

  // New handlers for delete confirmation
  const handleDeleteClick = (sessionId: string) => {
    setSessionToDeleteId(sessionId);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (sessionToDeleteId) {
      deleteSession(sessionToDeleteId);
      setSessionToDeleteId(null); // Clear the ID after deletion
    }
    setShowDeleteConfirm(false); // Close the dialog
  };

  const handleCancelDelete = () => {
    setSessionToDeleteId(null); // Clear the ID
    setShowDeleteConfirm(false); // Close the dialog
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.applicationGroupLabel')}</SidebarGroupLabel>
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
                    <span>{t('sidebar.createNew')}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.historyGroupLabel')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              type="text"
              placeholder={t('sidebar.searchSessionsPlaceholder')}
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
                        <div className="text-center">{session.title}</div>
                      </Rest>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenChange(session)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {/* Change onClick to open confirmation modal */}
                      <Trash
                        className="h-4 w-4 ml-auto"
                        onClick={() => handleDeleteClick(session.id)}
                      />
                    </HStack>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <EditDialog
        open={open}
        setOpen={setOpen}
        editTitle={editTitle}
        handleSaveTitle={handleSaveTitle}
        handleTitleChange={handleTitleChange}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('sidebar.deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('sidebar.deleteConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              {t('sidebar.deleteConfirmCancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              {t('sidebar.deleteConfirmAction')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
