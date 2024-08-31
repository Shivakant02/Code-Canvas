import { Link, useNavigate } from "react-router-dom";
import "./pageStyle/grid.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { useLoginMutation } from "../redux/slices/authApi";
import { handleError } from "../utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  // console.log(userInput);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!userInput.email || !userInput.password) {
        toast.error("All fields are mandetory");
        return;
      }

      const response = await login(userInput).unwrap();
      if (response.success) {
        dispatch(updateCurrentUser(response.user));
        dispatch(updateIsLoggedIn(true));
        toast.success(response.message);
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className=" bg-grid w-full h-[calc(100vh-60px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative py-3 sm:max-w-xs sm:mx-auto"
      >
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                Login to your Account
              </p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy
                experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-xs text-gray-400"
              >
                Email
              </label>
              <input
                required
                onChange={handleUserInput}
                disabled={isLoading}
                name="email"
                value={userInput.email}
                id="email"
                placeholder="abc@example.com"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-semibold text-xs text-gray-400"
            >
              Password
            </label>
            <input
              required
              onChange={handleUserInput}
              disabled={isLoading}
              name="password"
              value={userInput.password}
              id="password"
              placeholder="••••••••"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              type="password"
            />
          </div>
          <div>
            <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none  focus:ring-offset-2 rounded-lg cursor-pointer select-none">
              Login
            </button>
          </div>
          <div className=" my-3 flex flex-row items-center justify-center">
            <p>
              Don{"'"}t have an account?{" "}
              <Link className=" text-blue-500 underline" to="/signup">
                Signup{" "}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
