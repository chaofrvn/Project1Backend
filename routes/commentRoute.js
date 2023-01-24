import express from "express";
import {
  createComment,
  getCommentOfAPost,
  getAverageRating,
  editComment,
} from "../controllers/comment.js";

const router = express.Router();
router.post("/", createComment);
router.get("/:doc", getCommentOfAPost); //get all comments of a doc
router.get("/rating/:doc", getAverageRating); //get average rating of a doc
router.put("/:docId", editComment);
export default router;
