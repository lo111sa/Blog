import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { registerUser, checkIsAuth } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    dispatch(registerUser(data));
  };

  if (isAuth) return <Navigate to="/" />;
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="d-flex flex-column gap-4 w-25 p-3 bg-light bg-transparent rounded mx-auto my-5"
    >
      <p className="text-lg-center">Login Page</p>
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
        <button type="submit" className="btn btn-primary w-50 ">
          Register
        </button>

        <Link className="text-white w-75" to="/login">
          Already registered?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
