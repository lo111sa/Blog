import React, { useEffect, useState } from "react";
import axios from "../axios";
import PostItem from "../components/PostItem";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

const PostsPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const isAuth = useSelector(checkIsAuth);

  const fetchMyPosts = async () => {
    const { data } = await axios.get("posts/my/posts");
    setMyPosts(data);
  };

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);
  if (!isAuth) return <Navigate to="/" />;
  if (!myPosts.length)
    return <div className="text-center">You have no posts</div>;

  return (
    <div className="d-flex flex-column align-items-center ">
      {myPosts?.map((post) => {
        return <PostItem key={post._id} {...post} />;
      })}
    </div>
  );
};

export default PostsPage;
