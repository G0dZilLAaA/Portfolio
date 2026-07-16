import prisma from "../../config/prisma.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";

export async function getAllProjects() {

    return prisma.project.findMany({
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
            "Project with same title already exists",
            409
        );
    }

    const technologies = await prisma.technology.findMany({
        where: {
            name: {
                in: data.technologies
            }
        }
    });

    if (technologies.length !== data.technologies.length) {
        throw new AppError(
            "One or more technologies do not exist",
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

                create: technologies.map((tech) => ({
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