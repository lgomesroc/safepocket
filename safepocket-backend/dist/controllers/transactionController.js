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
exports.getBalance = exports.deleteTransaction = exports.updateTransaction = exports.getTransactions = exports.createTransaction = void 0;
const typeorm_1 = require("typeorm");
const Transaction_1 = require("../entities/Transaction");
// Criar uma nova transação
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount, type, userId } = req.body;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transaction = new Transaction_1.Transaction();
        transaction.description = description;
        transaction.amount = amount;
        transaction.user = { id: userId }; // Associe a transação ao usuário
        const result = yield transactionRepository.save(transaction);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar transação" });
    }
});
exports.createTransaction = createTransaction;
// Obter todas as transações
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transactions = yield transactionRepository.find();
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao obter transações" });
    }
});
exports.getTransactions = getTransactions;
// Atualizar uma transação
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield transactionRepository.save(transaction);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar transação" });
    }
});
exports.updateTransaction = updateTransaction;
// Remover uma transação
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.deleteTransaction = deleteTransaction;
// Obter saldo atual
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
        const transactions = yield transactionRepository.find({
            where: { user: { id: Number(userId) } },
        });
        const balance = transactions.reduce((acc, transaction) => {
            return transaction.amount; // Ajuste o cálculo se necessário
        }, 0);
        res.status(200).json({ balance });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao calcular saldo" });
    }
});
exports.getBalance = getBalance;
