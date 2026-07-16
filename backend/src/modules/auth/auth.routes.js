import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
    register,
    me,
    login
} from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.get("/me", authenticate, me);
router.post("/login", login);

export default router;