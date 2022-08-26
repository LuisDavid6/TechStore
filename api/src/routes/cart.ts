import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express()


router.put("/addToCart/:userId", async (req, res) => {

    const {userId} = req.params
    const {productId} = req.body
    try {

        const product = await prisma.product.findUnique({
            where:{
                id: productId
            }
        })

        const productList = []
        productList.push(product)
        
        await prisma.cart.update({
            where:{
                userId
            },
            data: {
                // @ts-ignore
                products: productList
            }
        }) 

        res.json("Product added to cart")

    }catch({message}) {
        res.json(message)
    }
})

router.put("/removeToCart")




export default router