import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

export default function errorHandler(err, req, res, next) {

    console.error(err);

    // Zod Validation Error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues
        });
    }

    // Prisma Unique Constraint
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

        if (err.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "Resource already exists"
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // JWT Error
    if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.TokenExpiredError
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    // Custom Errors
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Unknown
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}