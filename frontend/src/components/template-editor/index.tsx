import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useSession } from "../../context/session-context";

export function TemplateEditor() {
  const { currentSession, updateSessionTemplate } = useSession();
  const currentTemplate = currentSession?.template || "";

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
        onChange={handleTemplateChange}
        name="ACE_EDITOR_OF_MUSTACHE"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        showPrintMargin={false}
        value={currentTemplate}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
