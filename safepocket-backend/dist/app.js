"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
// Rotas
app.use('/api/auth', authRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
exports.default = app;
