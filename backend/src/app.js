import express from "express";
import cors from "cors";

import technologyRoutes from "./modules/technologies/technology.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
// Global Error Handler
app.use(errorHandler);

export default app;