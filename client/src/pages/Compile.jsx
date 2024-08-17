import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import RenderCode from "../components/RenderCode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { handleError } from "../utils/handleError";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updadeFullCode } from "../redux/slices/compilerSlice";

function Compile() {
  const { urlId } = useParams();
  // console.log(urlId);
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/compiler/load", {
        urlId: urlId,
      });
      dispatch(updadeFullCode(response.data.fullCode));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  return (
    <div>
      <PanelGroup direction="horizontal">
        <Panel minSize={20} className=" h-[calc(100vh-60px)]">
          <HelperHeader />
          <CodeEditor />
        </Panel>
        <PanelResizeHandle className=" w-1 bg-black " />
        <Panel minSize={20} className=" w-full">
          <RenderCode />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Compile;
