import { Router } from "express";

import {
    getTechnologies,
    createTechnology,
    deleteTechnology
} from "./technology.controller.js";

import {
    authenticate
} from "../../middleware/auth.middleware.js";

import {
    authorize
} from "../../middleware/authorize.middleware.js";

const router = Router();

router.get("/", getTechnologies);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    createTechnology
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteTechnology
);

export default router;