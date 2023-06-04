import { Button } from "bootstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slices/postSlice";
import { checkIsAuth } from "../redux/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);

    dispatch(createPost(formData));
    navigate("/");
  };

  const clearForm = () => {
    setTitle("");
    setText("");
    setImage("");
  };

  if (!isAuth) return <Navigate to="/" />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="d-flex flex-column gap-3 w-50 mx-auto"
    >
      <label className="border border-secondary rounded text-center py-2">
        Choose picture
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          hidden
        />
      </label>
      <div className="text-center">
        {image && (
          <img
            width={550}
            height={370}
            src={URL.createObjectURL(image)}
            alt="image"
          />
        )}
      </div>
      <label className="d-flex flex-column gap-2">
        Title :
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="form-control opacity-50"
          placeholder="Title"
          aria-label="Title"
          aria-describedby="basic-addon1"
        />
      </label>

      <label className="d-flex flex-column gap-2">
        Text :
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control opacity-50 "
          rows={10}
          placeholder="Text"
          aria-label="Text"
          aria-describedby="basic-addon1"
        />
      </label>

      <div className="d-flex gap-3 justify-content-center">
        <button onClick={onSubmit} type="submit" className="btn btn-secondary">
          Add post
        </button>
        <button onClick={clearForm} type="button" className="btn btn-danger">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPostPage;
