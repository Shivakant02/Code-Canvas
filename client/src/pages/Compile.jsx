import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import RenderCode from "../components/RenderCode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { handleError } from "../utils/handleError";
import { useDispatch } from "react-redux";
import { updadeFullCode } from "../redux/slices/compilerSlice";
import { useLoadCodeMutation } from "../redux/slices/authApi";
import Loader from "../components/Loader";

function Compile() {
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const { urlId } = useParams();
  // console.log(urlId);
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      // const response = await axios.post("http://localhost:5000/compiler/load", {
      //   urlId: urlId,
      // });
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updadeFullCode(response.fullCode));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading)
    return (
      <div className=" w-full h-[calc(100vh-60px)] flex items-center justify-center">
        <Loader />
      </div>
    );

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
