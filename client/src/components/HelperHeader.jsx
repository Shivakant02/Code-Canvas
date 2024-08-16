import { Save, Share2 } from "lucide-react";
function HelperHeader() {
  return (
    <div className=" _helper_header h-[50px] bg-black text-white p-2 flex items-center justify-between gap-6">
      <div className="_btn_container flex gap-2">
        <button className=" btn btn-success btn-sm ">
          <Save size={16} />
          Save
        </button>
        <button className=" btn btn-primary btn-sm">
          <Share2 size={16} /> Share
        </button>
      </div>
      <div className="_tab_switcher flex gap-2">
        <select
          defaultValue="html"
          className="select w-[120px] select-sm max-w-xs"
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">Javascript</option>
        </select>
      </div>
    </div>
  );
}

export default HelperHeader;
