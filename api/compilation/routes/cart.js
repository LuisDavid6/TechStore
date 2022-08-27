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
router.put("/addToCart/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { productId } = req.body;
    try {
        const product = yield prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        const productList = [];
        productList.push(product);
        yield prisma.cart.update({
            where: {
                userId
            },
            data: {
                // @ts-ignore
                products: productList
            }
        });
        res.json("Product added to cart");
    }
    catch ({ message }) {
        res.json(message);
    }
}));
router.put("/removeToCart");
exports.default = router;
//# sourceMappingURL=cart.js.map