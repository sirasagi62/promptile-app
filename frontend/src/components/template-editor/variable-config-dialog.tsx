import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VariableConfigDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  extractedVariables: string[];
  sessionVariables: Record<string, string>;
  onSave: (updatedVariables: Record<string, string>) => void;
}

export function VariableConfigDialog({
  open,
  setOpen,
  extractedVariables,
  sessionVariables,
  onSave,
}: VariableConfigDialogProps) {
  const [variableTypes, setVariableTypes] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialTypes: Record<string, string> = {};
    extractedVariables.forEach((variable) => {
      initialTypes[variable] = sessionVariables[variable] || "string"; // Default to "string"
    });
    setVariableTypes(initialTypes);
  }, [extractedVariables, sessionVariables]);

  const handleTypeChange = (variableName: string, type: string) => {
    setVariableTypes((prev) => ({
      ...prev,
      [variableName]: type,
    }));
  };

  const handleSave = () => {
    onSave(variableTypes);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Template Variables</DialogTitle>
          <DialogDescription>
            Define the types for your template variables.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {extractedVariables.length === 0 ? (
            <p className="text-muted-foreground">No variables found in the template.</p>
          ) : (
            extractedVariables.map((variable) => (
              <div key={variable} className="grid grid-cols-4 items-center gap-4">
                <label htmlFor={variable} className="text-right col-span-2">
                  {variable}
                </label>
                <Input
                  id={variable}
                  value={variableTypes[variable] || ""}
                  onChange={(e) => handleTypeChange(variable, e.target.value)}
                  className="col-span-2"
                  placeholder="e.g., string, number, boolean"
                />
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={extractedVariables.length === 0}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
