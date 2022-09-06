import express, { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import {verifyToken} from "../middlewares/auth"

const prisma = new PrismaClient()
const router = express()

router.get("/payOut", [verifyToken], async (req:Request, res: Response)=>{

    // @ts-ignore
    const id = req.userId

    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            },
            include:{
                cart: true
            }
        })
        
        const sale = await prisma.sale.create({
            data:{
                userId: user?.id,
                // @ts-ignore
                cart: user?.cart

            }
        })

        await prisma.cart.update({
            where:{
                // @ts-ignore
                id: user?.cart.id
            },
            data:{
                products: []
            }
        })

        res.json("successful purchase")
    } catch (error) {
        res.json("error")
    }
})

router.get("/", async (req, res) =>{
    try {
        const sales = await prisma.sale.findMany()
        res.json(sales)
    } catch (error) {
        res.json("error")
    }
})


export default router