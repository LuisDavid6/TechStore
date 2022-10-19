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

        const currentDate = new Date().toString().substring(0,25)
        const month = currentDate.slice(4,7)
        const day = currentDate.slice(8,10)
        const newDate = currentDate.replace(month+" "+day, day+" "+month)
        
        const sale = await prisma.sale.create({
            data:{
                // @ts-ignore
                user: {id:user.id, username:user.userName},
                orderNum,
                dateFormat: newDate,                
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

        res.json({orderNum: sale.orderNum})
    } catch ({message}) {
        res.json("Error")
    }
})

router.get("/", async (req, res) =>{

    try {
        const sales = await prisma.sale.findMany({
            orderBy:{
                date: "desc"
            }
        })
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


    } catch ({message}) {
        res.json(message)
    }
})

router.get("/salesManagement", async(req, res) =>{

    const {date} = req.query
    
    if(date){

        try {
            const sales = await prisma.sale.findMany({
                where:{
                    dateFormat:{
                        contains: `${date}`,
                        mode: "insensitive"
                    },
                },
            })

            const categories = await prisma.category.findMany({
                select:{
                    id: true,
                    name: true
                }
            })

            const list:any = []

            sales.map((e:any) =>{
                e.cart.products.map((f:any)=>{
                    const catFound = categories.find(c =>c.id === f.categoryId)
                    const foundList = list.find((l:any) =>l.name === catFound?.name)
                    if(foundList){
                        list.map((r:any)=>{
                            if(r.name === foundList.name) r.cant= r.cant+f.cant
                        })
                    }else{
                        list.push({name:catFound?.name, cant: f.cant})
                    }
                })
            })

            const listCategories:any = []
            const listCantVentas:any = []

            list.map((e:any)=>{
                listCategories.push(e.name)
                listCantVentas.push(e.cant)
            
            })

            return res.json([listCategories, listCantVentas])

        } catch ({message}) {
            return res.json(message)
        }
    }

    res.json("No date provided")
})


export default router