"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use("/api", routes_1.default);
// Inicialização do servidor
(0, typeorm_1.createConnection)().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}).catch(error => console.log(error));