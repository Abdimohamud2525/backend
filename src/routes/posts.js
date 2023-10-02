import express from "express";
import {
  createpost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controlis/PostControlers.js";
import { validatePostRegistration } from "../validatord/postValidator.js";
import { authenticate } from "../middware/outmiddleware.js";

const postsRouter = express.Router();

postsRouter.post("/", validatePostRegistration, authenticate, createpost);
postsRouter.get("/get-post/:id", getPostById);
postsRouter.get("/get-posts", getPosts);
postsRouter.post("/update-post/:id", authenticate, updatePost);
postsRouter.delete("/delet-post/:id", authenticate, deletePost);

// postsRouter
//   .route("/:id")
//   .get(getPostById)
//   .put(authenticate, updatePost)
//   .delete(authenticate, deletePost);

export default postsRouter;
