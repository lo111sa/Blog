import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

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

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const { data } = await axios.get("/posts");
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
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
