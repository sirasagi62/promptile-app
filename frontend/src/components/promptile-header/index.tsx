import { Button } from "@/components/ui/button";
import { HeaderGroup, HeaderStack } from "../stacks";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <HeaderStack className="p-8 w-full h-16 bg-[#fafafa]  border-b border-gray-300 ">
      <HeaderGroup className="gap-3">
        <SidebarTrigger />
              <h1 className="font-bold text-md">Promptile</h1>

      </HeaderGroup>
      <HeaderGroup className="gap-3">
        <Button variant="outline">
          <a href="https://ui.shadcn.com/docs">公式 Document</a>
        </Button>
        <Button>menu</Button>
      </HeaderGroup>
    </HeaderStack>
  );
};
