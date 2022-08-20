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
        res.json("category creted")
        
    } catch (error:any) {
        res.json(error.message)
    }

})

router.get("/", async (req, res) =>{
    try {
        const categories =  await prisma.category.findMany({
            include:{
                subCategories:true
            }
        })
        res.json(categories)
    } catch (error) {
        res.json("Error")
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

export default router