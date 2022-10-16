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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middlewares/auth");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.default)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: {
                cart: true,
            }
        });
        res.json(users);
    }
    catch (e) {
        res.json(e.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password, role } = req.body;
    if (userName && email && password) {
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
        try {
            const user = yield prisma.user.create({
                data: {
                    userName,
                    email,
                    password: hashedPassword,
                    role
                }
            });
            //creamos el carrito al usuario
            const cart = yield prisma.cart.create({
                data: {
                    userId: user.id
                }
            });
            res.json("usuario creado");
        }
        catch (e) {
            res.json(e.message);
        }
    }
    else
        res.json("error en los datos proporcionados");
}));
router.put("/update/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (req.body.password) {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, Number(process.env.SALT_ROUNDS));
            req.body.password = hashedPassword;
        }
        yield prisma.user.update({
            where: {
                id: userId
            },
            data: req.body
        });
        res.json("Update success");
    }
    catch ({ message }) {
        res.json("Error");
    }
}));
router.delete("/delete/:userId", [auth_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.params;
    try {
        // @ts-ignore
        const id = req.userId;
        const user = yield prisma.user.findUnique({
            where: {
                id
            }
        });
        if (user && user.role === "admin") {
            const userDelete = yield prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    cart: true
                }
            });
            yield prisma.cart.delete({
                where: {
                    id: (_a = userDelete === null || userDelete === void 0 ? void 0 : userDelete.cart) === null || _a === void 0 ? void 0 : _a.id
                }
            });
            yield prisma.user.delete({
                where: {
                    id: userId
                }
            });
            return res.json("User deleted");
        }
        res.status(401).json("Unauthorized");
    }
    catch ({ message }) {
        res.json("Error");
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json("no se recibieron todos los datos");
        const user = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user)
            return res.json("usuario o contraseña incorrectos");
        const pass = yield bcrypt_1.default.compare(password, user.password);
        if (!pass)
            return res.json("usuario o contraseña incorrectos");
        const userForToken = {
            id: user.id,
            username: user.userName
        };
        //{expiresIn: } opcional para tiempo de expiracion, segundos*minutos*horas*dias*....
        // const token = jwt.sign(userForToken, process.env.JWT_SECRET || "", {expiresIn: 60*60*24*30})
        const token = jsonwebtoken_1.default.sign(userForToken, process.env.JWT_SECRET || "");
        res.json({ token: token });
    }
    catch (error) {
        return res.status(400).send('Error al iniciar sesión');
    }
}));
router.get("/verifyRole", [auth_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const id = req.userId;
        const user = yield prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                userName: true,
                email: true,
                role: true,
                cart: true,
                comments: true,
                sales: true
            }
        });
        res.json(user);
    }
    catch (error) {
        res.json("error");
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map