import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


export const generateToken = (userId, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({userId}, jwtSecret, {expiresIn:"7d"});
    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development",
    })
    return token;
}