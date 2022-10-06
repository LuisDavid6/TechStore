"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const categories_1 = __importDefault(require("./routes/categories"));
const cart_1 = __importDefault(require("./routes/cart"));
const sales_1 = __importDefault(require("./routes/sales"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
//middlewares
app.use(express_1.default.urlencoded({ extended: false })); //midleware que permite recibir datos de formularios externos y de stripe
app.use(express_1.default.json()); //middleware que transforma la req.body a json
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
//rutes
app.use("/products", products_1.default);
app.use("/users", users_1.default);
app.use("/categories", categories_1.default);
app.use("/cart", cart_1.default);
app.use("/sales", sales_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await prisma.user.findUnique({
    //     where:{
    //         email : "juan@gmail.com"
    //     }
    // })
    // if(!user){
    //     await prisma.user.create({
    //         data:{
    //             userName:"juan",
    //             email:"juan@gmail.com",
    //             password:"123"
    //         }
    //     })
    // }    
    // await prisma.product.createMany({
    //     data: datas,
    // })
    console.log(`server running on port ${PORT}`);
}));
//# sourceMappingURL=index.js.map