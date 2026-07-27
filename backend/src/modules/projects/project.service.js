import prisma from "../../config/prisma.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";

export async function getAllProjects() {

    return prisma.project.findMany({

        where: {
            published: true
        },

        include: {
            technologies: {
                include: {
                    technology: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }

    });

}

export async function getProjectBySlug(slug) {

    const project = await prisma.project.findUnique({

        where: {
            slug
        },

        include: {
            technologies: {
                include: {
                    technology: true
                }
            }
        }

    });

    if (!project) {

        throw new AppError(
            "Project not found",
            404
        );

    }

    return project;

}

export async function createProject(data) {

    const slug = slugify(data.title, {
        lower: true,
        strict: true
    });

    const existingProject = await prisma.project.findUnique({
        where: {
            slug
        }
    });

    if (existingProject) {

        throw new AppError(
            "Project already exists",
            409
        );

    }

    const technologies = await prisma.technology.findMany({

        where: {
            id: {
                in: data.technologyIds
            }
        }

    });

    if (technologies.length !== data.technologyIds.length) {

        throw new AppError(
            "Invalid technologies",
            400
        );

    }

    return prisma.project.create({

        data: {

            title: data.title,

            slug,

            shortDescription: data.shortDescription,

            description: data.description,

            githubUrl: data.githubUrl,

            liveUrl: data.liveUrl,

            thumbnail: data.thumbnail,

            featured: data.featured ?? false,

            published: data.published ?? false,

            technologies: {

                create: technologies.map(tech => ({

                    technology: {

                        connect: {

                            id: tech.id

                        }

                    }

                }))

            }

        },

        include: {

            technologies: {

                include: {

                    technology: true

                }

            }

        }

    });

}