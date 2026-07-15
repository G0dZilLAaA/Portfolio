import express from "express";

import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);

export default app;