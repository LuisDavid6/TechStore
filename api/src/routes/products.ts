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
router.post("/", async (req, res) =>{

    const {name,price,discount,type,stock,image,category,description,specs} = req.body
    const totalPrice = price-(price*(Number(discount)/100))

    try {
        const categ = await prisma.category.findFirst({
            where:{
                name: category
            }
        })
        
        if(categ){
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price,
                    discount,
                    type,
                    description,
                    specs,
                    stock,
                    image,
                    category:{
                        connect: {id: categ.id}
                    },
                    totalPrice
                }
            })
            return res.json("product created")
        }
        console.log("ok")
    } catch ({message}) {
        console.log({message})
        // res.json("Error")
        res.json(message)

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

