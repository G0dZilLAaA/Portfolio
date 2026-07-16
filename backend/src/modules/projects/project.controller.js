import {
    createProjectSchema
} from "./project.validation.js";

import * as projectService from "./project.service.js";

export async function getProjects(req, res, next) {

    try {

        const projects = await projectService.getAllProjects();

        return res.json({
            success: true,
            data: projects
        });

    }
    catch (err) {

        next(err);

    }

}

export async function createProject(req, res, next) {

    try {

        const data = createProjectSchema.parse(req.body);

        const project = await projectService.createProject(data);

        return res.status(201).json({

            success: true,

            message: "Project created successfully",

            data: project

        });

    }
    catch (err) {

        next(err);

    }

}