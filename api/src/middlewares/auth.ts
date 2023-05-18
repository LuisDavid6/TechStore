import express, { Request, Response, NextFunction }from "express";
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()
const router = express()

export const verifyToken = async (req:Request, res:Response, next:NextFunction) =>{

    try {
        const authorization = req.get("authorization")
        if(!authorization || !authorization.toLowerCase().startsWith("bearer"))return res.json("No token provided")
        
        const token = authorization?.substring(7)
        // @ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
        // @ts-ignore
        if(!token || !decoded.id) return res.status(401).json("invalid token")

        // @ts-ignore
        req.userId =  decoded.id

        next()
        
    } catch (error) {
        res.json("invalid token")
    }

}