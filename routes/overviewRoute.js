import express from "express";
import {
  userRatioOverview,
  documentOverview,
  numOfUserByDate,
  numOfDocumentByDate,
} from "../controllers/overview.js";
import { adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();
router.get("/overview/user", userRatioOverview, adminOnly);
router.get("/overview/document", documentOverview, adminOnly);
router.get("/overview/userByDate", numOfUserByDate, adminOnly);
router.get("/overview/documentByDate", numOfDocumentByDate, adminOnly);

export default router;
