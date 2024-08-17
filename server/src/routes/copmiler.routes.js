import express from "express";
import { saveCode } from "../controllers/compiler.controller.js";

export const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
