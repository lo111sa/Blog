import { json } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//Create post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: "Error while adding post" });
  }
};

//Get all posts

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return json({ message: "No posts found" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Can't get posts" });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: {
        views: 1,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: "Can't get post" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    /*  const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    if (!list) {
      return res.json("You have no posts");
    }

    res.json(list); */

    const list = await Post.find({ author: req.userId });

    if (!list) {
      return res.json("You have no posts");
    }

    res.json(list);
  } catch (error) {
    res.json({ message: "Could not find  posts" });
  }
};
