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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Transaction_1 = require("../entities/Transaction");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Certifique-se de implementar e exportar authenticateJWT
const router = (0, express_1.Router)();
// Criar uma nova transação
router.post("/", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount, type, userId } = req.body;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transaction = new Transaction_1.Transaction();
        transaction.description = description;
        transaction.amount = amount;
        transaction.user = { id: userId }; // Associe a transação ao usuário
        // Se type for necessário, você deve adicionar um campo no modelo de Transaction
        // transaction.type = type;
        const result = yield transactionRepository.save(transaction);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar transação" });
    }
}));
// Obter todas as transações
router.get("/", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transactions = yield transactionRepository.find();
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao obter transações" });
    }
}));
// Atualizar uma transação
router.put("/:id", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description, amount, type } = req.body;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transaction = yield transactionRepository.findOne({ where: { id: Number(id) } });
        if (!transaction) {
            return res.status(404).json({ error: "Transação não encontrada" });
        }
        transaction.description = description;
        transaction.amount = amount;
        // Se type for necessário, adicione ao modelo e defina aqui
        // transaction.type = type;
        const result = yield transactionRepository.save(transaction);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar transação" });
    }
}));
// Remover uma transação
router.delete("/:id", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const result = yield transactionRepository.delete({ id: Number(id) });
        if (result.affected === 0) {
            return res.status(404).json({ error: "Transação não encontrada" });
        }
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao remover transação" });
    }
}));
// Obter saldo atual
router.get("/balance/:userId", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transactions = yield transactionRepository.find({
            where: { user: { id: Number(userId) } },
        });
        const balance = transactions.reduce((acc, transaction) => {
            // Se type for necessário, adicione ao modelo e defina aqui
            // return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
            return acc; // Ajuste conforme necessário
        }, 0);
        res.status(200).json({ balance });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao calcular saldo" });
    }
}));
exports.default = router;
