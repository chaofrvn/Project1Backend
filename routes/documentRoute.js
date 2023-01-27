import express from "express";
import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentByType,
  getDocumentBySubject,
} from "../controllers/documents.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/documents", verifyUser, getDocuments);
router.get("/documents/:id", verifyUser, getDocumentById);
router.get("/documentsbytype/:type", verifyUser, getDocumentByType);

router.get("/documentsbysubject/:subject", verifyUser, getDocumentBySubject);
router.post("/documents", verifyUser, adminOnly, createDocument);
router.patch("/documents/:id", verifyUser, adminOnly, updateDocument);
router.delete("/documents/:id", verifyUser, adminOnly, deleteDocument);

export default router;
