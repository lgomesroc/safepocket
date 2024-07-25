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
const router = (0, express_1.Router)();
// Criar uma nova transação
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, value, type, userId } = req.body;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transaction = new Transaction_1.Transaction();
        transaction.description = description;
        transaction.value = value;
        transaction.type = type;
        transaction.user = { id: userId }; // Associe a transação ao usuário
        const result = yield transactionRepository.save(transaction);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar transação" });
    }
}));
// Obter todas as transações
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description, value, type } = req.body;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transaction = yield transactionRepository.findOne(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transação não encontrada" });
        }
        transaction.description = description;
        transaction.value = value;
        transaction.type = type;
        const result = yield transactionRepository.save(transaction);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar transação" });
    }
}));
// Remover uma transação
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const result = yield transactionRepository.delete(id);
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
router.get("/balance/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transactions = yield transactionRepository.find({ where: { user: { id: userId } } });
        const balance = transactions.reduce((acc, transaction) => {
            return transaction.type === "income" ? acc + transaction.value : acc - transaction.value;
        }, 0);
        res.status(200).json({ balance });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao calcular saldo" });
    }
}));
router.post('/', authenticateJWT, createTransaction);
router.get('/', authenticateJWT, getTransactions);
router.put('/:id', authenticateJWT, updateTransaction);
router.delete('/:id', authenticateJWT, deleteTransaction);
router.get('/balance/:userId', authenticateJWT, getBalance);
exports.default = router;
