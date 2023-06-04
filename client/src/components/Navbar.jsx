import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector((state) => state.auth.user);
  const activeStyles = {
    color: "white",
    borderBottom: "1px solid white",
  };

  const logoutHandle = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <div className="d-flex justify-content-between align-items-center py-4">
      <NavLink to={"/"}>
        <div className="border py-2 px-4 ">LOGO</div>
      </NavLink>
      <ul className="d-flex justify-content-between align-items-center gap-5 ">
        <NavLink
          to={"/"}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          <li className="pb-1">Main</li>
        </NavLink>

        <NavLink
          to={"/posts"}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          <li className="pb-1">My posts</li>
        </NavLink>
        <NavLink
          to={"/new"}
          className="hover-effect"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          <li className="pb-1">Add post</li>
        </NavLink>
      </ul>
      <div className="d-flex gap-3 align-items-center">
        <div className="border  py-1 px-4  rounded ">
          {isAuth ? (
            <>
              <button onClick={logoutHandle}>{user.username}</button>
            </>
          ) : (
            <Link to={"/login"}>Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
