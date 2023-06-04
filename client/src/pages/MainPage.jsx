import React, { useEffect } from "react";
import { getAllPosts } from "../redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import PopularPostItem from "../components/PopularPostItem";

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <div className="text-center mt-5">No posts found</div>;
  }
  return (
    <div className=" d-flex gap-3 justify-content-center">
      <div className="d-flex flex-column justify-content-center align-items-center  w-75 ">
        {posts?.map((post, index) => {
          return <PostItem key={post._id} {...post} />;
        })}
      </div>
      <div className=" w-25 text-center h-25 d-flex flex-column align-items-center pt-3">
        <div>
          <p>Popular posts</p>
        </div>
        {popularPosts?.map((post) => {
          return <PopularPostItem key={post._id} {...post} />;
        })}
      </div>
    </div>
  );
};

export default MainPage;
