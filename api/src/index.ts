import express,{Request,Response} from "express"
import products from "./routes/products"
import users from "./routes/users"
import categories from "./routes/categories"
import { PrismaClient } from '@prisma/client'
import cors from "cors"
import cookieParser from 'cookie-parser';
import datas from "./Data"


const prisma = new PrismaClient()
const app = express()

const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json())  //middleware que transforma la req.body a json
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}))
app.use(cookieParser())


//rutes
app.use("/products", products)
app.use("/users", users)
app.use("/categories", categories)


app.listen(PORT, async()=>{

    const user = await prisma.user.findUnique({
        where:{
            email : "juan@gmail.com"
        }
    })
    
    if(!user){
        await prisma.user.create({
            data:{
                userName:"juan",
                email:"juan@gmail.com",
                password:"123"
            }
        })
    }    

    // await prisma.product.createMany({
    //     data: datas
    // })
        
    console.log(`server running on port ${PORT}`)
})