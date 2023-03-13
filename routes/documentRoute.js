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

router.get("/documents", getDocuments);
router.get("/documents/:id", getDocumentById);
router.get("/documentsbytype/:type", getDocumentByType);

router.get("/documentsbysubject/:subject", getDocumentBySubject);
router.post("/documents", verifyUser, adminOnly, createDocument);
router.patch("/documents/:id", verifyUser, adminOnly, updateDocument);
router.delete("/documents/:id", verifyUser, adminOnly, deleteDocument);

export default router;
