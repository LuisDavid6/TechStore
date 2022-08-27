import express,{Request,Response} from "express"
import products from "./routes/products"
import users from "./routes/users"
import categories from "./routes/categories"
import cart from "./routes/cart"
import { PrismaClient } from '@prisma/client'
import cors from "cors"
import cookieParser from 'cookie-parser';
import morgan from "morgan"
import datas from "./Data"


const prisma = new PrismaClient()
const app = express()

const PORT = process.env.PORT;

//middlewares
app.use(express.json())  //middleware que transforma la req.body a json
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}))
app.use(cookieParser())
app.use(morgan('dev'));


//rutes
app.use("/products", products)
app.use("/users", users)
app.use("/categories", categories)
app.use("/cart", cart)



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
        
    console.log(`servering running on port ${PORT}`)
})