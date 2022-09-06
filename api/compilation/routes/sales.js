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
const auth_1 = require("../middlewares/auth");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.default)();
router.get("/payOut", [auth_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.userId;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id
            },
            include: {
                cart: true
            }
        });
        const sale = yield prisma.sale.create({
            data: {
                userId: user === null || user === void 0 ? void 0 : user.id,
                // @ts-ignore
                cart: user === null || user === void 0 ? void 0 : user.cart
            }
        });
        yield prisma.cart.update({
            where: {
                // @ts-ignore
                id: user === null || user === void 0 ? void 0 : user.cart.id
            },
            data: {
                products: []
            }
        });
        res.json("successful purchase");
    }
    catch (error) {
        res.json("error");
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.sale.findMany();
        res.json(sales);
    }
    catch (error) {
        res.json("error");
    }
}));
exports.default = router;
//# sourceMappingURL=sales.js.map