import express from "express"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const router = express()


router.post("/", async (req, res) =>{

    const {name} = req.body
    try {
        const category = await prisma.category.create({
            data:{
                name
            }
        })
        res.json("category created")
        
    } catch (error:any) {
        res.json(error.message)
    }

})

router.get("/", async (req, res) =>{

    const {category} = req.query
    if(category){
        try {
            const filterCategory = await prisma.category.findFirst({
                where:{
                    // @ts-ignore
                    name: category
                },
                include:{
                    subCategories:true,
                    products: true
                }
                
            }) 
            return res.json(filterCategory)
        } catch (error) {
            return res.json("ERROR")
        }

    }
    try {
        const categories =  await prisma.category.findMany({
            include:{
                subCategories:true,
                products:true
            }
        })
        res.json(categories)
    } catch (error) {
        res.json("Error")
    }
})

router.delete("/delete/:id", async (req, res) =>{

    const {id} = req.params
    try {
        const category = await prisma.category.delete({
            where:{
                id
            }                
            
        })
        res.json("Category deleted")
        
    } catch (error:any) {
        res.json(error.message)
    }

})

router.post("/subcategory/:categoryId", async (req, res) =>{

    const {name} = req.body
    const {categoryId} = req.params
    try {
        const subCategory = await prisma.subCategory.create({
            data:{
                name,
                categoryId
            }
        })
        res.json("Subcategory created")
        
    } catch (error:any) {
        res.json(error.message)
    }

})

router.delete("/subcategory/delete/:id", async (req, res) =>{

    const {id} = req.params
    try {
        const subCategory = await prisma.subCategory.delete({
            where:{
                id
            }                
            
        })
        res.json("subCategory deleted")
        
    } catch (error:any) {
        res.json(error.message)
    }

})

router.get("/pages/:page", async (req, res) =>{

    const {category} = req.query
    const {page} = req.params
    if(category){
        try {
            const filterCategory = await prisma.category.findFirst({
                where:{
                    // @ts-ignore
                    name: category
                },
                include:{
                    subCategories:true,
                    products: true
                },
                orderBy:{
                    name:"asc"
                },
            }) 

            const cant = await prisma.product.count({
                where:{
                    categoryId : filterCategory?.id
                }
            })

            //@ts-ignore
            const products = filterCategory.products.slice((page*8)-8,page*8)

            return res.json({cant, products})

        } catch ({message}) {
            return res.json("Error")
        }
    }

    res.json("No category provided")

})

export default router