import express, { json } from "express"
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

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            },
            include:{
                cart: true
            }
        })

        //@ts-ignore
        const productInCart = user.cart.products.find(e=> e.id === productId)

        if(productInCart) {
            // @ts-ignore
            productInCart.cant = productInCart.cant +1
            // @ts-ignore
            const totalCart = user.cart.total + productInCart.totalPrice
            JSON.stringify(product)
            await prisma.cart.update({
                where:{
                    userId
                },
                data: {
                    // @ts-ignore
                    products: user.cart.products,
                    total: totalCart
                }
            }) 

        }else {
            // @ts-ignore
            product.cant = 1
            // @ts-ignore
            product.totalValue = product.totalPrice
            // @ts-ignore
            const totalCart = user.cart.total + product.totalPrice
            JSON.stringify(product)

            await prisma.cart.update({
                where:{
                    userId
                },
                data: {
                    // @ts-ignore
                    products: {
                        // @ts-ignore
                        push: product
                    },
                    total: totalCart     
                }
            }) 
        }
        res.json("Product added to cart")

    }catch({message}) {
        res.json(message)
    }
})

router.put("/removeToCart")




export default router