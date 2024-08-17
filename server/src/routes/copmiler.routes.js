import { Router } from "express";
import { saveCode } from "../controllers/compiler.controller.js";

const router = Router();

router.post("/save", saveCode);

export default router;
