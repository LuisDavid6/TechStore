import express, { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import {verifyToken} from "../middlewares/auth"
import Stripe from "stripe"
import {customAlphabet} from "nanoid"

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

        const nanoid = customAlphabet("0123456789",10)
        const orderNum = nanoid()
        
        const sale = await prisma.sale.create({
            data:{
                // @ts-ignore
                user: {id:user.id, username:user.userName},
                orderNum,
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

        await prisma.user.update({
            where:{
                id: user?.id,
            },
            data:{
                // @ts-ignore
                sales: {
                    // @ts-ignore
                    push: sale,
                },  
            }
        })

        res.json("successfull purchase")
    } catch ({message}) {
        res.json("Error")
    }
})

router.get("/", async (req, res) =>{

    try {
        const sales = await prisma.sale.findMany({})
        res.json(sales)
    } catch (error) {
        res.json("error")
    }
})

router.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params

    try {
        await prisma.sale.delete({
            where:{
                id
            }
        })
        res.json("OK")


    } catch (error) {
        res.json("ERROR")
    }
})


export default router