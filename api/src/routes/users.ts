import express from "express"
import { PrismaClient } from '@prisma/client'
// import bcrypt from "bcrypt"

const prisma = new PrismaClient()
const router = express()

router.get("/", async (req, res) =>{

    try{
        const users = await prisma.user.findMany()
        res.json(users)

    }catch(e:any){
        res.json(e.message)
    }
})

router.post("/", async (req, res) =>{

    const {userName, email, password} = req.body

    if(userName && email && password){


        // const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        // console.log(hashedPassword)

        try{
            await prisma.user.create({
                data:{
                    userName,
                    email,
                    password
                }
            })
            res.json("usuario creado")
            
        }catch(e:any){
            res.json(e.message)
            
        }
    }else res.json("error en los datos proporcionados")

})

export default router