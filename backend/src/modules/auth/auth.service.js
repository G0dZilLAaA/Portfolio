import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
export async function registerUser(data) {
    const { username, email, password } = data;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    });

    if (existingUser) {
        throw new AppError(
    "Email or Username already exists",
    409
);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            username,
            email,
            passwordHash
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            provider: true,
            createdAt: true
        }
    });
}

export async function loginUser(email, password) {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user)
        throw new AppError(
    "Invalid email or password",
    401
);

    const validPassword = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!validPassword)
        throw new Error("Invalid email or password");

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
}