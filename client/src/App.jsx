import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AddPostPage from "./pages/AddPostPage";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/:id" element={<PostPage />} />
        <Route path="/:id/edit" element={<EditPostPage />} />
        <Route path="/new" element={<AddPostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
