import { Router } from "express";
import {
  getUserData,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getMyCodes } from "../controllers/compiler.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-details", verifyToken, getUserData);

router.get("/my-codes", verifyToken, getMyCodes);
export default router;
