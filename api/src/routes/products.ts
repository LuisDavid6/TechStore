import express from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express()

// localhost:3001/products/
router.get("/", async (req, res) =>{

    try{
        const allProducts = await prisma.product.findMany({
            include: {
                category:{
                    include:{
                        subCategories:true
                    }
                }   
            }
        })
        res.json(allProducts)

    }catch(e:any){
        res.json(e.message)
    }
})

// localhost:3001/products/details
router.get("/details/:id", async (req,res) =>{
    const {id} = req.params
    try {
        const product = await prisma.product.findUnique({
            where:{
                id
            }
        })
        res.json(product)
    } catch (error) {
        res.json("ERROR")
    }
})

// localhost:3001/products/
router.post("/:categoryId", async (req, res) =>{

    const {name,price,discount,type,image} = req.body
    const {categoryId} = req.params
    const totalPrice = price

    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                discount,
                type,
                image,
                category:{
                    connect: {id: categoryId}
                },
                totalPrice
            }
          })
        res.json(newProduct)
    } catch (error) {
        res.json("ERROR")
    }
    

})

// localhost:3001/products/update/
router.put("/update/:id", async (req, res) =>{

    const {id} = req.params
    try {
        await prisma.product.update({
            where:{
                id: id
            },
            data: req.body
        })
        res.json("Update success")
    } catch (error) {
        res.json("ERROR")
    }
})

// localhost:3001/products/delete/
router.delete("/delete/:id", async (req, res) =>{
    const {id} = req.params
    try {
        const product = await prisma.product.delete({
            where:{
                id: id
            }
        })
        res.json(product)
    } catch (error) {
        res.json("ERROR")
    }
})


export default router

