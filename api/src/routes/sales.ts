import express, { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import {verifyToken} from "../middlewares/auth"
import Stripe from "stripe"

const prisma = new PrismaClient()
const router = express()

const {STRIPE_KEY} : any = process.env


router.post("/payOut", [verifyToken], async (req:Request, res: Response)=>{
    
    // @ts-ignore
    const id = req.userId
    const {paymentId} = req.body
    const stripe = new Stripe(STRIPE_KEY,{apiVersion:"2022-08-01"})

    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            },
            include:{
                cart: true
            }
        })
        
        // @ts-ignore
        const amount = Math.floor(user?.cart?.total /40)

        const payment = await stripe.paymentIntents.create({
            // @ts-ignore
            amount,
            currency: "USD",
            payment_method: paymentId,
            description: "Productos tecnologicos",
            confirm: true
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
                products: [],
                total: 0
            }
        })

        res.json("successfull purchase")
    } catch ({message}) {
        res.json(message)
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