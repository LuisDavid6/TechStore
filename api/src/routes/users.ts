import express, { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import verifyToken from "../middlewares/auth"

const prisma = new PrismaClient()
const router = express()

router.get("/", async (req, res) =>{

    try{
        const users = await prisma.user.findMany({
            include:{
                cart: true
            }
        })
        res.json(users)

    }catch(e:any){
        res.json(e.message)
    }
})

router.post("/", async (req, res) =>{

    const {userName, email, password, role} = req.body

    if(userName && email && password){

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))

        try{
            const user = await prisma.user.create({
                data:{
                    userName,
                    email,
                    password: hashedPassword,
                    role
                }
            })

            //creamos el carrito al usuario
        
            const cart = await prisma.cart.create({
                data:{
                    userId: user.id
                }
            })
            
            res.json("usuario creado")
            
        }catch(e:any){
            res.json(e.message)
            
        }
    }else res.json("error en los datos proporcionados")

})


router.post("/login", async (req,res) =>{

    try {
        const {email, password} = req.body

        if(!email || !password) return res.json("no se recibieron todos los datos")
        
        const user = await prisma.user.findFirst({
            where:{
                email  
            }
        })
        
        if(!user) return res.json("usuario o contraseña incorrectos")
        
        const pass = await bcrypt.compare(password, user.password)
    
        if(!pass) return res.json("usuario o contraseña incorrectos")
    
        const userForToken = {
            id: user.id,
            username: user.userName
        } 
        
        //{expiresIn: } opcional para tiempo de expiracion, segundos*minutos*horas*dias*....
        // const token = jwt.sign(userForToken, process.env.JWT_SECRET || "", {expiresIn: 60*60*24*30})
        const token = jwt.sign(userForToken, process.env.JWT_SECRET || "")
    
        res.json({token:token})

    } catch (error) {
        return res.status(400).send('Error al iniciar sesión');
    }    
})

router.get("/verifyRole", [verifyToken], async (req: Request, res:Response) =>{

    try {
        // @ts-ignore
        const id = req.userId

        const user = await prisma.user.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                userName: true,
                email: true,
                role: true,
                cart: true,
                comments: true
            }
        })

        res.json(user)
        
    } catch (error) {
        res.json("error")
    }
})

export default router