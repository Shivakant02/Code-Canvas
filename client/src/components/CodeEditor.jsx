import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

function CodeEditor() {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      theme={dracula}
      value={value}
      height="100vh"
      extensions={[loadLanguage("javascript")]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
