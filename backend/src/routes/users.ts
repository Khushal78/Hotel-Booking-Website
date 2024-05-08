import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    [
    check("firstName","First name is required").isString(),
    check("lastName","Last name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","password with 6 or more characters required").isLength({min:6})
 ], 
 async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }
    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        user = new User(req.body);
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        // Set token in cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000, // 1 day in milliseconds
        });

        // Send response
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
