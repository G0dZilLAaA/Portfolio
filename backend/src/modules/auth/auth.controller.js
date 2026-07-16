import {
    registerSchema,
    loginSchema
} from "./auth.validation.js";

import {
    registerUser,
    loginUser
} from "./auth.service.js";

export async function register(req, res, next) {

    try {

        const data = registerSchema.parse(req.body);

        const user = await registerUser(data);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    }
    catch (err) {
        next(err);
    }

}

export async function login(req, res, next) {

    try {

        const data = loginSchema.parse(req.body);

        const result = await loginUser(
            data.email,
            data.password
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    }
    catch (err) {
        next(err);
    }

}
export async function me(req, res) {
    return res.status(200).json({
        success: true,
        data: req.user
    });
}