import { Loader2, Save, Share2 } from "lucide-react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLanguage } from "../redux/slices/compilerSlice";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function HelperHeader() {
  const [saveLoading, setSaveLoading] = useState(false);

  const navigate = useNavigate();

  const { fullCode } = useSelector((state) => state.compiler);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/compiler/save", {
        fullCode: fullCode,
      });

      console.log(response.data);
      navigate(`/compile/${response.data.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state) => state.compiler);

  const handleChange = (event) => {
    const newLang = event.target.value;
    dispatch(updateCurrentLanguage(newLang));
  };
  return (
    <div className=" _helper_header h-[50px] bg-black text-white p-2 flex items-center justify-between gap-6">
      <div className="_btn_container flex gap-2">
        <button
          onClick={handleSave}
          className=" btn btn-success btn-sm "
          disabled={saveLoading}
        >
          {saveLoading ? (
            <>
              <Loader2 className=" animate-spin" /> Saving
            </>
          ) : (
            <>
              <Save size={16} />
              Save
            </>
          )}
        </button>
        <button className=" btn btn-primary btn-sm">
          <Share2 size={16} /> Share
        </button>
      </div>
      <div className="_tab_switcher flex gap-2">
        <select
          defaultValue={currentLanguage}
          onChange={handleChange}
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
