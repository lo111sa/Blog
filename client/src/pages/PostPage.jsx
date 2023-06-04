import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  const fetchPostById = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  if (!post) {
    return <div className="text-center">No post found</div>;
  }
  return (
    <div className="d-flex flex-column w-75   mb-4 border rounded shadow ">
      <div className="d-flex  gap-3 align-items-center p-3 ">
        <div className=" text-white opacity-50">{post.username}</div>
        <div className=" text-white opacity-50">
          {new Date(post.createdAt).toDateString()}
        </div>
      </div>
      <div>
        {post.imgUrl && (
          <img
            className="w-100 mb-3"
            src={`http://localhost:5000/${post.imgUrl}`}
            alt="image"
          />
        )}
      </div>

      <div className="text-white ps-2">{post.title}</div>
      <p className="text-white opacity-50 pt-4 ps-2">{post.text}</p>
      <div className="d-flex gap-4 p-2">
        <button className="d-flex align-items-center gap-1">
          <AiFillEye /> <span>{post.views}</span>
        </button>

        <button className="d-flex align-items-center gap-1">
          <AiOutlineMessage /> <span>0</span>
        </button>
      </div>
    </div>
  );
};

export default PostPage;
