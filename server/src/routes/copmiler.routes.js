import { Router } from "express";
import { loadCode, saveCode } from "../controllers/compiler.controller.js";

const router = Router();

router.post("/save", saveCode);
router.post("/load", loadCode);

export default router;
