import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
export function YAMLEditor() {
  const [code, setCode] = React.useState(`- yaml`);
  return (
    // <textarea
    //   className='w-full h-full p-5'
    //   value={code}
    //   onChange={e => setCode(e.currentTarget.value)}
    // />
    <AceEditor
      mode="handlebars"
      theme="monokai"
      onChange={(code) => setCode(code)}
      name="ACE_EDITOR_OF_MUSTACHE"
      editorProps={{ $blockScrolling: true }}
      showGutter={false}
      style= {{
        width:"100%",
        height:"100%"
      }}
    />
  );
}
