import { Code } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { handleError } from "../utils/handleError";
import { useDeleteCodeMutation } from "../redux/slices/authApi";
import toast from "react-hot-toast";
function CodeItem({ data, disable }) {
  const [deleteCode] = useDeleteCodeMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteCode(data._id).unwrap();
      toast.success(response.message);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className=" border-2 p-3 rounded-xl border-slate-500 bg-slate-900">
      <div className="flex justify-start items-center gap-1">
        <Code />
        <p className=" font-mono font-bold text-lg">{data.title}</p>
      </div>
      <br />
      <div className="flex flex-row gap-2">
        <Link to={`/compile/${data._id}`}>
          <button className=" btn btn-success btn-sm">open</button>
        </Link>

        <button
          disabled={disable}
          className="btn btn-sm btn-error"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          delete
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg"> Hello Coder!</h3>
          <p className="py-4">Are you want to delete this code ?</p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={handleDelete} className="btn btn-sm btn-error">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

CodeItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CodeItem;
