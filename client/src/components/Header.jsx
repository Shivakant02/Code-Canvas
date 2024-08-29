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
            <button className=" btn btn-outline btn-sm btn-ghost text-xl rounded-md pb-2">
              Compiler
            </button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button className=" btn  btn-sm btn-primary rounded-md">
              Signup
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className=" btn  btn-sm btn-primary rounded-md">
              Login
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
