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
    } catch ({message}) {
        // console.log({message})
        res.json("Error")
        // res.json(message)

    }
    

})

// localhost:3001/products/update/
router.put("/update/:id", async (req, res) =>{
    
    const {id} = req.params
    if(req.body.price || req.body.discount){
        const totalPrice = req.body.price-(req.body.price*(Number(req.body.discount)/100))
        req.body.totalPrice = totalPrice
    }
    
    try {
        await prisma.product.update({
            where:{
                id: id
            },
            data: req.body
        })
        res.json("Update success")
    } catch (error:any) {
        // console.log(error.message)
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
    } catch ({message}) {
        res.json("Error")
    }
})

router.get("/search/",async (req, res) => {
    const {query} = req.query
    try {
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    {
                        name:{
                           contains: `${query}`,
                           mode: "insensitive"
                        }
                    },
                    {
                        category:{
                            name:{
                                contains: `${query}`,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        type:{
                            contains: `${query}`,
                            mode: "insensitive"
                        }
                    }
                ]
            },
        })

        res.json(products)

    } catch (error) {
        res.json("Error")
    }
})

router.get("/pages/:page", async (req, res) =>{

    const {page} = req.params
    const {offer} = req.query

    try{
        
        if(offer){

            const cant = await prisma.product.count({
                where:{
                    imageOffer:{
                        contains:"http"
                    }
                }
            })

            const allProducts = await prisma.product.findMany({
                include: {
                    category:true   
                },
                where:{
                    imageOffer: {
                        contains: "http"
                    }
                },
                orderBy:{
                    name:"asc"
                }
            })
            //@ts-ignore
            const products = allProducts.slice((page*8)-8,page*8)
            
            return res.json({cant, products})
        }
        
        const cant = await prisma.product.count({})

        const allProducts = await prisma.product.findMany({
            include: {
                category:true   
            },
            orderBy:{
                name: "asc"
            }
        })
        //@ts-ignore
        const products = allProducts.slice((page*8)-8,page*8)

        res.json({cant, products})

    }catch({message}){
        res.json("Error")
    }
})


export default router

