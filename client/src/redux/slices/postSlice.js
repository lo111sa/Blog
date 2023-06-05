import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

//Create new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Get all posts
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

//Remove post
export const removePost = createAsyncThunk("posts/removePost", async (id) => {
  const { data } = await axios.delete(`/posts/${id}`, id);
  return data;
});
const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create new post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
      }),
      builder.addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      });

    //Gat all posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
      }),
      builder.addCase(getAllPosts.rejected, (state) => {
        state.isLoading = false;
      });

    //Remove post
    builder.addCase(removePost.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(removePost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg
        );

        state.popularPosts = state.popularPosts.filter(
          (post) => post._id !== action.meta.arg
        );
      }),
      builder.addCase(removePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
