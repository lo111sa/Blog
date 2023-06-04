import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
} from "../controllers/posts.js";

const router = new Router();

//Create post
//http://localhost:5000/api/posts
router.post("/", checkAuth, createPost);

//Get all post
//http://localhost:5000/api/posts
router.get("/", getAll);

//Get  post by id
//http://localhost:5000/api/posts/:id
router.get("/:id", getById);

//Get  My Posts
//http://localhost:5000/api/posts/me
router.get("/my/posts", checkAuth, getMyPosts);

export default router;
