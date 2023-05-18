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
exports.verifyToken = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.default)();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.get("authorization");
        if (!authorization || !authorization.toLowerCase().startsWith("bearer"))
            return res.json("No token provided");
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.substring(7);
        // @ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        // @ts-ignore
        if (!token || !decoded.id)
            return res.status(401).json("invalid token");
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.json("invalid token");
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map