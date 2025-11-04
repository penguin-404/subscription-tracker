import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/env.js'


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error("User with this email already exists");
            error.status = 409; // Conflict
            throw error;
        }

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{username,email,password:hashedPassword}],{session})
        
        const token = jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN  })

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User created Successfully",
            data: {
                token,
                user: newUser[0]
            }
        });
    } catch (error) {
        await session.abortTransaction();
        next(error); // Pass the error to the error handling middleware
    } finally {
        session.endSession();
    }
}

export const signIn = async (req, res, next) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            const error = new Error('User with this email does not exist');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password , user.password);

        if (!isPasswordValid) {
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user,
            }
        })
    } catch (error) {
        next(error);
    }
}

export const signOut = (req, res, next) => {
    
}