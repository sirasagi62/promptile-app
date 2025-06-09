import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next"; // Import useTranslation

export interface EditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editTitle: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveTitle: () => void;
}

export function EditDialog({
  open,
  setOpen,
  editTitle,
  handleTitleChange,
  handleSaveTitle,
}: EditDialogProps) {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-blackA9 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0 focus:outline-hidden">
        <DialogTitle className="m-0 text-[17px] font-medium">
          {t('editDialog.title')}
        </DialogTitle>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label
            htmlFor="name"
            className="text-[15px] font-medium leading-normal"
          >
            {t('editDialog.labelTitle')}
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
          <Button variant="ghost" className="Button violet" onClick={()=>setOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSaveTitle} className="Button violet">
            {t('common.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
