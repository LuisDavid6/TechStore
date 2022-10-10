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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.default)();
// localhost:3001/products/
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.product.findMany({
            include: {
                category: {
                    include: {
                        subCategories: true
                    }
                }
            }
        });
        res.json(allProducts);
    }
    catch (e) {
        res.json(e.message);
    }
}));
// localhost:3001/products/details
router.get("/details/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield prisma.product.findUnique({
            where: {
                id
            }
        });
        res.json(product);
    }
    catch (error) {
        res.json("ERROR");
    }
}));
// localhost:3001/products/
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, discount, type, stock, image, category, description, specs } = req.body;
    const totalPrice = price - (price * (Number(discount) / 100));
    try {
        const categ = yield prisma.category.findFirst({
            where: {
                name: category
            }
        });
        if (categ) {
            const newProduct = yield prisma.product.create({
                data: {
                    name,
                    price,
                    discount,
                    type,
                    description,
                    specs,
                    stock,
                    image,
                    category: {
                        connect: { id: categ.id }
                    },
                    totalPrice
                }
            });
            return res.json("product created");
        }
        console.log("ok");
    }
    catch ({ message }) {
        // console.log({message})
        res.json("Error");
        // res.json(message)
    }
}));
// localhost:3001/products/update/
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { id } = req.params;
    try {
        yield prisma.product.update({
            where: {
                id: id
            },
            data: req.body
        });
        res.json("Update success");
    }
    catch (error) {
        console.log(error.message);
        res.json("ERROR");
    }
}));
// localhost:3001/products/delete/
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield prisma.product.delete({
            where: {
                id: id
            }
        });
        res.json(product);
    }
    catch (error) {
        res.json("ERROR");
    }
}));
exports.default = router;
//# sourceMappingURL=products.js.map