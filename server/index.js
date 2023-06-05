import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();

dotenv.config();

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${"losaberidze777"}:${"123asdASD"}@cluster0.vuthdrx.mongodb.net/${"full-blog"}?retryWrites=true&w=majority`
    );
    app.listen(5000, () => console.log(`server started on port ${5000}`));
  } catch (error) {
    console.log(error);
  }
}

start();
