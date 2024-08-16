import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useSelector } from "react-redux";

function CodeEditor() {
  const { currentLanguage } = useSelector((state) => state.compiler);
  console.log(currentLanguage);
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
      extensions={[loadLanguage(currentLanguage)]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
