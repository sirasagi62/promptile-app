import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useSession } from "../../context/session-context";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function TemplateEditor() {
  const { t } = useTranslation();
  const { currentSession, updateSessionTemplate, addSession, sessions } =
    useSession();
  const currentTemplate = currentSession?.template || "";

  const handleFocus = () => {
    if (sessions.length === 0 && !currentSession) {
      addSession(t("sidebar.newSessionDefaultTitle"));
      toast.info(t("template-editor.addSession"))
    }
  };
  const handleTemplateChange = (newTemplate: string) => {
    if (currentSession) {
      updateSessionTemplate(currentSession.id, newTemplate);
    }
  };

  return (
    <div className="relative h-full w-full">
      <AceEditor
        mode="handlebars"
        theme="monokai"
        onFocus={handleFocus}
        onChange={handleTemplateChange}
        name="ACE_EDITOR_OF_MUSTACHE"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        showPrintMargin={false}
        wrapEnabled={true}
        value={currentTemplate}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
