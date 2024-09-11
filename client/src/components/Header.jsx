import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../utils/handleError";
import { useLogoutMutation } from "../redux/slices/authApi";
import { updateCurrentUser, updateIsLoggedIn } from "../redux/slices/authSlice";

function Header() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();
  // console.log(isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <nav className=" w-full h-[60px] bg-gray-950 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className=" font-bold text-xl select-none"> CodeCanvas</h2>
      </Link>
      <ul className=" gap-2 flex flex-row items-center justify-center">
        <li>
          <Link to="/compile">
            <button className=" btn btn-primary btn-sm btn-link text-xl rounded-md pb-2">
              Compiler
            </button>
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="compile/all-codes">
                <button className=" btn btn-outline btn-info btn-sm rounded-md">
                  All_Codes
                </button>
              </Link>
            </li>
            <li>
              <Link to="/user/my-codes">
                <button className=" btn btn-outline btn-info btn-sm rounded-md">
                  My_Codes
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className=" btn  btn-sm btn-error rounded-md"
              >
                Logout
              </button>
            </li>
            <li>
              <Link to="/profile">
                <div className="avatar flex flex-col justify-center items-center">
                  <div className="w-10 rounded-full">
                    <img src={currentUser.picture} alt="profile" />
                  </div>
                </div>
              </Link>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
