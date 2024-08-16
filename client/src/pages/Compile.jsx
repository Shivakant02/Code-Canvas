import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
function Compile() {
  return (
    <div>
      <PanelGroup direction="horizontal">
        <Panel minSize={20} className=" h-[calc(100vh-60px)]">
          <HelperHeader />
          <CodeEditor />
        </Panel>
        <PanelResizeHandle className=" w-1 bg-black " />
        <Panel minSize={20} className=" w-full">
          <PanelGroup direction="Vertical">
            <Panel minSize={20}>two</Panel>
            <PanelResizeHandle className=" h-1 bg-black" />
            <Panel minSize={20}>Three</Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Compile;
