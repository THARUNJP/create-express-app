import { Router } from "express";
import { healthz } from "./health.controller";

const router = Router();

router.get("/", healthz);

export default router;
