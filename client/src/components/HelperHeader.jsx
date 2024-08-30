import { Copy, Loader2, Save, Share2 } from "lucide-react";

// import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLanguage } from "../redux/slices/compilerSlice";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import toast from "react-hot-toast";
import { useSaveCodeMutation } from "../redux/slices/authApi";
function HelperHeader() {
  // const [saveLoading, setSaveLoading] = useState(false);

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const navigate = useNavigate();

  const { fullCode } = useSelector((state) => state.compiler);

  const handleSave = async () => {
    // setSaveLoading(true);
    try {
      // const response = await axios.post("http://localhost:5000/compiler/save", {
      //   fullCode: fullCode,
      // });

      const response = await saveCode(fullCode).unwrap();

      // console.log(response.data);
      navigate(`/compile/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
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
          disabled={isLoading}
        >
          {isLoading ? (
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
        <button
          className="btn btn-primary btn-sm"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <Share2 size={16} /> Share
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center mb-2">
              {" "}
              Share your Code!
            </h3>
            <div className=" flex flex-row gap-2 items-center">
              <input
                className=" w-5/6 outline-none rounded-md px-2 py-2 bg-black text-white"
                type="text"
                value={window.location.href}
              />
              <button
                onClick={() => {
                  window.navigator.clipboard.writeText(window.location.href);
                  toast("Link copied to clipboard", {
                    position: "bottom-right",
                    style: {
                      background: "black",
                      color: "white",
                    },
                  });
                }}
                className=" px-3 py-2 rounded-md border-2  border-accent text-accent hover:bg-accent ease-in-out duration-300 hover:text-black "
              >
                <Copy size={16} />
              </button>
            </div>

            <p className="py-4 text-center">
              Share this URL with your friends to collaborate.
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
