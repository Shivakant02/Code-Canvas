import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Compile from "./pages/Compile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useGetUserDetailsQuery } from "./redux/slices/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/authSlice";

function App() {
  const { data, error } = useGetUserDetailsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data.user));
      dispatch(updateIsLoggedIn(true));
    }
  }, [data, error]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compile" element={<Compile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/compile/:urlId" element={<Compile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
