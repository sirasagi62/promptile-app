import { HeaderGroup, HeaderStack } from "../stacks";
import { SidebarTrigger } from "../ui/sidebar";
import { useSession } from "@/context/session-context";
import { useEffect, useState } from "react";

export const Header = () => {
  const { currentSession } = useSession();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (currentSession) {
      setTitle(currentSession.title);
    }
  }, [currentSession]);


  return (
    <HeaderStack className="p-8 w-full h-16 bg-[#fafafa] border-b border-gray-300">
      <HeaderGroup className="gap-3">
        <SidebarTrigger />
        <h1 className="font-bold text-md">{title}</h1>
      </HeaderGroup>
      <HeaderGroup className="gap-3">
      </HeaderGroup>
    </HeaderStack>
  );
};
