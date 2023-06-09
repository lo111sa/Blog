import React, { useState } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiFillDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../redux/slices/postSlice";

const PostItem = ({
  _id,
  username,
  imgUrl,
  title,
  createdAt,
  text,
  views,
  author,
  comments,
}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column w-75   mb-4 border rounded shadow ">
      <div className="d-flex  gap-3 align-items-center justify-content-between p-3 ">
        <div>
          <div className=" text-white fs-3 ">{username}</div>
          <div className=" text-white opacity-50 fs-6">
            {new Date(createdAt).toDateString()}
          </div>
        </div>

        {user?._id === author && (
          <div className="d-flex align-items-center gap-2">
            <button>
              <AiOutlineEdit />
            </button>
            <button onClick={() => dispatch(removePost(_id))}>
              <AiFillDelete />
            </button>
          </div>
        )}
      </div>
      <Link to={`/${_id}`}>
        <div>
          {imgUrl && (
            <img
              className="w-100 mb-3"
              src={`http://localhost:5000/${imgUrl}`}
              alt={imgUrl}
            />
          )}
        </div>
      </Link>
      <div className="text-white ps-2">{title}</div>
      <p className="text-white opacity-50 pt-4 ps-2">{text}</p>
      <div className="d-flex gap-4 p-2">
        <button className="d-flex align-items-center gap-1">
          <AiFillEye /> <span>{views}</span>
        </button>

        <button className="d-flex align-items-center gap-1">
          <AiOutlineMessage /> <span>{comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
