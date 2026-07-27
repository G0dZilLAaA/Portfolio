import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export async function getAllTechnologies() {

    return prisma.technology.findMany({
        orderBy: {
            name: "asc"
        }
    });

}

export async function createTechnology(data) {

    const existingTechnology = await prisma.technology.findUnique({
        where: {
            name: data.name
        }
    });

    if (existingTechnology) {
        throw new AppError(
            "Technology already exists",
            409
        );
    }

    return prisma.technology.create({
        data: {
            name: data.name
        }
    });

}

export async function deleteTechnology(id) {

    const technology = await prisma.technology.findUnique({
        where: {
            id
        }
    });

    if (!technology) {
        throw new AppError(
            "Technology not found",
            404
        );
    }

    return prisma.technology.delete({
        where: {
            id
        }
    });

}