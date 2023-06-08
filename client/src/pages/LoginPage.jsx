import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkIsAuth } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }

    if (isAuth) {
      navigate("/");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  //if (isAuth) return <Navigate to="/" />;
  return (
    <form
      className="d-flex flex-column gap-4 w-25 p-3 bg-light bg-transparent rounded mx-auto my-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-lg-center ">Login Page</p>
      <label className="d-flex flex-column gap-2">
        Username :
        <input
          {...register("username")}
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </label>

      <label className="d-flex flex-column gap-2">
        Password :
        <input
          {...register("password")}
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </label>
      <div className="w-100 d-flex gap-3 justify-content-between align-items-center">
        <button type="submit" className="btn btn-primary w-75">
          Login
        </button>

        <Link className="text-white" to="/register">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
