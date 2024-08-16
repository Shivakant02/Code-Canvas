import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { updadeCodeValue } from "../redux/slices/compilerSlice";
function CodeEditor() {
  const dispatch = useDispatch();

  const { currentLanguage, fullCode } = useSelector((state) => state.compiler);

  const onChange = useCallback((val) => {
    dispatch(updadeCodeValue(val));
  }, []);

  return (
    <CodeMirror
      theme={dracula}
      value={fullCode[currentLanguage]}
      height="calc(100vh - 110px)"
      extensions={[loadLanguage(currentLanguage)]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
