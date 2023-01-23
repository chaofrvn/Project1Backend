import express from "express";
import { Login, logOut, Me, register } from "../controllers/auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);
router.post("/register", register);

export default router;
