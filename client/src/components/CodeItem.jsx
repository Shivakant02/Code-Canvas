import { Code } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function CodeItem({ data }) {
  return (
    <div className=" border-2 p-3 rounded border-slate-500 bg-slate-900">
      <div className="flex justify-start items-center gap-1">
        <Code />
        <p className=" font-mono font-bold text-lg">{data.title}</p>
      </div>
      <br />
      <Link to={`/compile/${data._id}`}>
        <button className=" btn btn-success btn-sm">open</button>
      </Link>
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
