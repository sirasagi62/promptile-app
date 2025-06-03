import { Button } from "@/components/ui/button";
import { HeaderGroup, HeaderStack } from "../stacks";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "@/components/ui/input";
import { useSession } from "@/context/session-context";
import { useEffect, useState } from "react";

export const Header = () => {
  const { currentSession, updateSessionTitle } = useSession();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (currentSession) {
      setTitle(currentSession.title);
    }
  }, [currentSession]);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(()=>e.target.value);
  };

  const handleTitleBlur = () => {
    if (currentSession) {
      updateSessionTitle(currentSession.id, title);
    }
  };

  return (
    <HeaderStack className="p-8 w-full h-16 bg-[#fafafa] border-b border-gray-300">
      <HeaderGroup className="gap-3">
        <SidebarTrigger />
        <h1 className="font-bold text-md">Promptile</h1>
      </HeaderGroup>
      <HeaderGroup className="gap-3">
        <Input
          type="text"
          placeholder="セッションタイトル"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          className="w-64"
          disabled={!currentSession}
        />
        <Button variant="outline">
          <a href="https://ui.shadcn.com/docs">公式 Document</a>
        </Button>
        <Button>menu</Button>
      </HeaderGroup>
    </HeaderStack>
  );
};
