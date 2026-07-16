import { Router } from "express";

import {
    getProjects,
    createProject
} from "./project.controller.js";

import {
    authenticate
} from "../../middleware/auth.middleware.js";

import {
    authorize
} from "../../middleware/authorize.middleware.js";

const router = Router();

router.get("/", getProjects);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createProject
);

export default router;