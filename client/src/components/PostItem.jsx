import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";

const PostItem = ({ _id, username, imgUrl, title, createdAt, text, views }) => {
  return (
    <div className="d-flex flex-column w-75   mb-4 border rounded shadow ">
      <div className="d-flex  gap-3 align-items-center p-3 ">
        <div className=" text-white opacity-50">{username}</div>
        <div className=" text-white opacity-50">
          {new Date(createdAt).toDateString()}
        </div>
      </div>
      <Link to={`/${_id}`}>
        <div>
          {imgUrl && (
            <img
              className="w-100 mb-3"
              src={`http://localhost:5000/${imgUrl}`}
              alt="image"
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
          <AiOutlineMessage /> <span>0</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
