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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const category = yield prisma.category.create({
            data: {
                name
            }
        });
        res.json("category created");
    }
    catch (error) {
        res.json(error.message);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    if (category) {
        try {
            const filterCategory = yield prisma.category.findFirst({
                where: {
                    // @ts-ignore
                    name: category
                },
                include: {
                    subCategories: true,
                    products: true
                }
            });
            return res.json(filterCategory);
        }
        catch (error) {
            return res.json("ERROR");
        }
    }
    try {
        const categories = yield prisma.category.findMany({
            include: {
                subCategories: true,
                products: true
            }
        });
        res.json(categories);
    }
    catch (error) {
        res.json("Error");
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield prisma.category.delete({
            where: {
                id
            }
        });
        res.json("Category deleted");
    }
    catch (error) {
        res.json(error.message);
    }
}));
router.post("/subcategory/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { categoryId } = req.params;
    try {
        const subCategory = yield prisma.subCategory.create({
            data: {
                name,
                categoryId
            }
        });
        res.json("Subcategory created");
    }
    catch (error) {
        res.json(error.message);
    }
}));
router.delete("/subcategory/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subCategory = yield prisma.subCategory.delete({
            where: {
                id
            }
        });
        res.json("subCategory deleted");
    }
    catch (error) {
        res.json(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=categories.js.map