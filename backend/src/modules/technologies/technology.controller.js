import { createTechnologySchema } from "./technology.validation.js";

import * as technologyService from "./technology.service.js";

export async function getTechnologies(req, res, next) {

    try {

        const technologies =
            await technologyService.getAllTechnologies();

        return res.json({
            success: true,
            data: technologies
        });

    } catch (err) {
        next(err);
    }

}

export async function createTechnology(req, res, next) {

    try {

        const data =
            createTechnologySchema.parse(req.body);

        const technology =
            await technologyService.createTechnology(data);

        return res.status(201).json({
            success: true,
            message: "Technology created successfully",
            data: technology
        });

    } catch (err) {
        next(err);
    }

}

export async function deleteTechnology(req, res, next) {

    try {

        await technologyService.deleteTechnology(
            req.params.id
        );

        return res.json({
            success: true,
            message: "Technology deleted successfully"
        });

    } catch (err) {
        next(err);
    }

}