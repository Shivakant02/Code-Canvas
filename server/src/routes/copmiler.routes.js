import { Router } from "express";
import { loadCode, saveCode } from "../controllers/compiler.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/save", verifyToken, saveCode);
router.post("/load", loadCode);

export default router;
