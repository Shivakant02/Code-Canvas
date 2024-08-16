import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor() {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="100vh"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
