import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function EditDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-blackA9 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0 focus:outline-none">
        <DialogTitle className="m-0 text-[17px] font-medium">
          セッション名の編集
        </DialogTitle>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label
            htmlFor="name"
            className="text-[15px] font-medium leading-[1.5]"
          >
            タイトル
          </label>
          <Input
            type="text"
            id="name"
            value={editTitle}
            onChange={handleTitleChange}
            className="w-full flex-1 rounded-[4px] border border-mauve7 bg-white px-[10px] py-[7px] shadow-blackA4 focus:shadow-blackA6"
          />
        </fieldset>
        <div className="mt-[25px] flex justify-end gap-4">
          <Button variant="ghost" className="Button violet">
            キャンセル
          </Button>
          <Button onClick={handleSaveTitle} className="Button violet">
            保存
          </Button>
        </div>
        <Button
          className="absolute right-4 top-4 rounded-full focus:shadow-blackA6"
          variant="ghost"
        >
          <X />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
