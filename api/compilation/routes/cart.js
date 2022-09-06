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
        //se busca el producto a agregar
        const product = yield prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        //se busca el usuario del carrito
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                cart: true
            }
        });
        //se revisa si existe el producto en el carrito
        //@ts-ignore
        const productInCart = user.cart.products.find(e => e.id === productId);
        //si existe se le suma 1 a cantidad y se le suma el precio al total de ese producto
        //despues se suma ese total al precio total a pagar en el carrito
        if (productInCart) {
            // @ts-ignore
            productInCart.cant = productInCart.cant + 1;
            // @ts-ignore
            productInCart.totalValue = productInCart.totalPrice * productInCart.cant;
            // @ts-ignore
            const totalCart = user.cart.total + productInCart.totalPrice;
            //se convierte a json para guardar en bd
            JSON.stringify(product);
            //se actualiza el producto y el valor total del carrito
            yield prisma.cart.update({
                where: {
                    userId
                },
                data: {
                    // @ts-ignore
                    products: user.cart.products,
                    total: totalCart
                }
            });
            // si no existe se guarda en el array productos del carrito y se agregan las propiedades
            // cant y totalValue al producto
        }
        else {
            // @ts-ignore
            product.cant = 1;
            // @ts-ignore
            product.totalValue = product.totalPrice;
            // @ts-ignore
            const totalCart = user.cart.total + product.totalPrice;
            //se convierte a json para guardar en bd
            JSON.stringify(product);
            //se agrega el producto al array de productos y se actualiza el valor total del carrito
            yield prisma.cart.update({
                where: {
                    userId
                },
                data: {
                    // @ts-ignore
                    products: {
                        // @ts-ignore
                        push: product
                    },
                    total: totalCart
                }
            });
        }
        res.json("Product added to cart");
    }
    catch ({ e }) {
        res.json("ERROR");
    }
}));
router.put("/removeToCart/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { productId } = req.body;
    try {
        //se busca el producto a remover
        const product = yield prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        //se busca el usuario del carrito
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                cart: true
            }
        });
        //se filtra solo el producto que se va a remover
        //@ts-ignore
        const productInCart = user.cart.products.find(e => e.id === productId);
        //si la cantidad de ese producto es 1 se elimina
        //@ts-ignore
        if (productInCart.cant === 1) {
            // @ts-ignore
            const totalCart = user.cart.total - productInCart.totalPrice;
            // @ts-ignore
            const products = user.cart.products.filter(e => e.id !== productInCart.id);
            //se convierte a json para guardar en bd
            JSON.stringify(products);
            //se actualiza el producto y el valor total del carrito
            yield prisma.cart.update({
                where: {
                    userId
                },
                data: {
                    // @ts-ignore
                    products: products,
                    total: totalCart
                }
            });
            //si cant es mayor a 1 se le resta uno y se resta al valor total del carrito
        }
        else {
            // @ts-ignore
            productInCart.cant = productInCart.cant - 1;
            // @ts-ignore
            productInCart.totalValue = productInCart.totalValue - productInCart.totalPrice;
            // @ts-ignore
            const totalCart = user.cart.total - productInCart.totalPrice;
            //se convierte a json para guardar en bd
            // @ts-ignore
            JSON.stringify(user.cart.products);
            //se actualiza la cant de ese producto y el valor total del carrito
            yield prisma.cart.update({
                where: {
                    userId
                },
                data: {
                    // @ts-ignore
                    products: user.cart.products,
                    total: totalCart
                }
            });
        }
        res.json("Product removed from cart");
    }
    catch ({ message }) {
        res.json(message);
    }
}));
exports.default = router;
//# sourceMappingURL=cart.js.map