import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import RenderCode from "../components/RenderCode";
import { useParams } from "react-router-dom";

function Compile() {
  const { urlId } = useParams();
  console.log(urlId);

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
