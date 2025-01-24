import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const {fullName,email,password} = req.body
    try {
        if (password.length < 6) {
            return res.status(400).json({message: "password must be at least 6 characters !"})
        }

        const user = await User.findOne({email})
        if (user) return res.status(400).json({message: "Email already exist !"})
        
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {

            // generate JWT token
            generateToken(newUser.id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

        } else {
            return res.status(400).json({message: "Invalid User Data"});
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
}

export const login = (req, res) => {
    res.send("login route")  
}

export const logout = (req, res) => {
    res.send("logout route")
}