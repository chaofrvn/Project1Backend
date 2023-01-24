import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createComment,
  getCommentOfADocument,
  getAverageRating,
  editComment,
  getCommentOfCurrentUserOnADocunment,
} from "../controllers/comment.js";

const router = express.Router();
router.post("/comment", verifyUser, createComment);
router.get("/comment/:docId", verifyUser, getCommentOfADocument); //get all comments of a doc
router.get("/rating/:docId", verifyUser, getAverageRating); //get average rating of a doc
router.patch("/comment/:docId", verifyUser, editComment); // edit comment
router.get(
  "/comment/me/:docId",
  verifyUser,
  getCommentOfCurrentUserOnADocunment
);
export default router;
