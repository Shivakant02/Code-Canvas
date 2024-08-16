import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className=" w-full h-[60px] bg-gray-950 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className=" font-bold text-xl select-none"> CodeCanvas</h2>
      </Link>
      <ul className=" flex gap-2">
        <li>
          <Link to="/compile">
            <button className=" btn btn-outline btn-sm btn-primary text-xl rounded-xl pb-2">
              Compiler
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
