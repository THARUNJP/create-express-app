import { Router } from "express";
import { healthz } from "../controllers/health.controller";

const router = Router();

router.get("/", healthz);

export default router;
