import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  getUserByRole,
} from "../controllers/users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.get("/usersbyrole/:role", verifyUser, adminOnly, getUserByRole);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.patch("/profile", verifyUser, updateProfile);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;
