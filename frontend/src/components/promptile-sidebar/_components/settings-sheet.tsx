import React from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label"; // Assuming Label component exists and is imported from here
import { Session } from "@/lib/session-db";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // `templates` prop is expected to be an array of all template objects
  // This data should be passed from the parent component (PromptileSidebar)
  sessions: Session[];
}

export function SettingsSheet({
  open,
  onOpenChange,
  sessions: templates,
}: SettingsSheetProps) {
  const { i18n, t } = useTranslation();

  const languageOptions = [
    { value: "en", label: t("settings.language.english") },
    { value: "ja", label: t("settings.language.japanese") },
  ];

  // Initialize selectedLanguage with the current i18n language
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleExportTemplates = () => {
    if (!templates || templates.length === 0) {
      console.warn("No templates to export.");
      // Optionally, you could show a user-friendly message (e.g., a toast notification)
      return;
    }

    // Map sessions to a serializable format, explicitly converting variables to a plain object
    const serializableTemplates = templates.map((template) => {
      let vars: Record<string, string> = {};
      Object.keys(template.variables).map((k) => {
        vars[k] = template.variables[k].type;
      });
      return {
        id: template.id,
        title: template.title,
        template: template.template,
        createdAt: template.createdAt,
        // Explicitly create a new object for variables, though JSON.stringify handles Record<string, T> directly
        variables: vars,
      };
    });
    console.log(serializableTemplates);

    const json = JSON.stringify(serializableTemplates, null, 2); // Pretty print JSON
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "templates.json"; // Suggested filename
    document.body.appendChild(a); // Append to body to make it clickable
    a.click(); // Programmatically click the link to trigger download
    document.body.removeChild(a); // Clean up the temporary link
    URL.revokeObjectURL(url); // Release the object URL
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("settings.title")}</SheetTitle>
          <SheetDescription>{t("settings.description")}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* Language Selection */}
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="language" className="text-right col-span-2">
              {t("settings.language.label")}
            </Label>
            <div className="col-span-3">
              <Combobox
                options={languageOptions}
                value={selectedLanguage}
                onValueChange={handleLanguageChange}
                placeholder={t("settings.language.placeholder")}
              />
            </div>
          </div>

          {/* Export Templates */}
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="export-templates" className="text-right col-span-2">
              {t("settings.export.label")}
            </Label>
            <div className="col-span-3">
              <Button onClick={handleExportTemplates} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {t("settings.export.button")}
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.export.description")}
              </p>
            </div>
          </div>
        </div>
        <SheetFooter>
          {/* Optional: Add a close button or other footer elements */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
