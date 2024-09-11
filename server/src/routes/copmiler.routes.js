import { Router } from "express";
import {
  deleteCode,
  getAllCodes,
  loadCode,
  saveCode,
} from "../controllers/compiler.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/save", verifyToken, saveCode);
router.post("/load", loadCode);
router.delete("/delete/:id", verifyToken, deleteCode);
router.get("/all-codes", verifyToken, getAllCodes);

export default router;
