import { ArrowDownToLine, Copy, Loader2, Save, Share2 } from "lucide-react";

// import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLanguage } from "../redux/slices/compilerSlice";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import toast from "react-hot-toast";
import { useSaveCodeMutation } from "../redux/slices/authApi";
import { useState } from "react";
function HelperHeader() {
  const [title, setTitle] = useState("");
  // const [saveLoading, setSaveLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const navigate = useNavigate();

  const { fullCode } = useSelector((state) => state.compiler);

  const handleSave = async () => {
    // setSaveLoading(true);
    try {
      // const response = await axios.post("http://localhost:5000/compiler/save", {
      //   fullCode: fullCode,
      // });

      const response = await saveCode({ fullCode, title }).unwrap();

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

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast.error("code is empty");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const jsLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      jsLink.href = URL.createObjectURL(javascriptCode);
      jsLink.download = "script.js";
      document.body.appendChild(jsLink);

      if (fullCode.html != "") {
        htmlLink.click();
      }
      if (fullCode.css != "") {
        cssLink.click();
      }
      if (fullCode.javascript != "") {
        jsLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(jsLink);
    }
  };
  return (
    <div className=" _helper_header h-[50px] bg-black text-white p-2 flex items-center justify-between gap-6">
      <div className="_btn_container flex gap-2">
        {isLoggedIn ? (
          <>
            <button
              // onClick={handleSave}
              onClick={() => document.getElementById("my_modal_1").showModal()}
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
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                  Save your code
                </h3>
                <div className=" flex flex-row gap-2 items-center mt-3 ">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=" w-5/6 outline-none rounded-md px-2 py-2 bg-black text-white"
                    type="text"
                    placeholder="Enter your title"
                  />
                  <button
                    onClick={handleSave}
                    className=" px-3 py-2 rounded-md border-2  border-success text-success hover:bg-success ease-in-out duration-300 hover:text-black "
                  >
                    <Save size={16} />
                  </button>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <button
              onClick={handleDownloadCode}
              className=" btn btn-primary btn-sm"
            >
              <ArrowDownToLine size={18} />
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <Share2 size={16} /> Share
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleDownloadCode}
              className=" btn btn-primary btn-sm"
            >
              <ArrowDownToLine size={18} />
            </button>
          </>
        )}
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
