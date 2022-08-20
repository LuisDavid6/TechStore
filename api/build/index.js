"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware que transforma la req.body a json
// app.get("/", (req:Request, res:Response) =>{
//     console.log("CLICK")
//     res.send("OK")
// })
app.listen(3001, () => {
    console.log("server running on port 3001");
});
