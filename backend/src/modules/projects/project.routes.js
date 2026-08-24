import { Router } from "express";

import {
    getProjects,
    getProjectBySlug,
    createProject
} from "./project.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = Router();

router.get("/", getProjects);

router.get("/:slug", getProjectBySlug);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createProject
);

export default router;