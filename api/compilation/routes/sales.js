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
const stripe_1 = __importDefault(require("stripe"));
const nanoid_1 = require("nanoid");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.default)();
const { STRIPE_KEY } = process.env;
router.post("/payOut", [auth_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const id = req.userId;
    const { paymentId } = req.body;
    const stripe = new stripe_1.default(STRIPE_KEY, { apiVersion: "2022-08-01" });
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id
            },
            include: {
                cart: true
            }
        });
        // @ts-ignore
        const amount = Math.floor(((_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.total) / 40);
        const payment = yield stripe.paymentIntents.create({
            // @ts-ignore
            amount,
            currency: "USD",
            payment_method: paymentId,
            description: "Productos tecnologicos",
            confirm: true
        });
        const nanoid = (0, nanoid_1.customAlphabet)("0123456789", 10);
        const orderNum = nanoid();
        const currentDate = new Date().toString().substring(0, 25);
        const month = currentDate.slice(4, 7);
        const day = currentDate.slice(8, 10);
        const newDate = currentDate.replace(month + " " + day, day + " " + month);
        const sale = yield prisma.sale.create({
            data: {
                // @ts-ignore
                user: { id: user.id, username: user.userName },
                orderNum,
                dateFormat: newDate,
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
                products: [],
                total: 0
            }
        });
        yield prisma.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data: {
                // @ts-ignore
                sales: {
                    // @ts-ignore
                    push: sale,
                },
            }
        });
        res.json({ orderNum: sale.orderNum });
    }
    catch ({ message }) {
        res.json("Error");
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.sale.findMany({
            orderBy: {
                date: "desc"
            }
        });
        res.json(sales);
    }
    catch (error) {
        res.json("error");
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.sale.delete({
            where: {
                id
            }
        });
        res.json("OK");
    }
    catch ({ message }) {
        res.json(message);
    }
}));
router.get("/salesManagement", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    if (date) {
        try {
            const sales = yield prisma.sale.findMany({
                where: {
                    dateFormat: {
                        contains: `${date}`,
                        mode: "insensitive"
                    },
                },
            });
            const categories = yield prisma.category.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
            const list = [];
            sales.map((e) => {
                e.cart.products.map((f) => {
                    const catFound = categories.find(c => c.id === f.categoryId);
                    const foundList = list.find((l) => l.name === (catFound === null || catFound === void 0 ? void 0 : catFound.name));
                    if (foundList) {
                        list.map((r) => {
                            if (r.name === foundList.name)
                                r.cant = r.cant + f.cant;
                        });
                    }
                    else {
                        list.push({ name: catFound === null || catFound === void 0 ? void 0 : catFound.name, cant: f.cant });
                    }
                });
            });
            const listCategories = [];
            const listCantVentas = [];
            list.map((e) => {
                listCategories.push(e.name);
                listCantVentas.push(e.cant);
            });
            return res.json([listCategories, listCantVentas]);
        }
        catch ({ message }) {
            return res.json(message);
        }
    }
    res.json("No date provided");
}));
exports.default = router;
//# sourceMappingURL=sales.js.map