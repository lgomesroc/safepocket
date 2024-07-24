import { Router } from "express";
import { getRepository } from "typeorm";
import { Transaction } from "../entities/Transaction";

const router = Router();

// Criar uma nova transação
router.post("/", async (req, res) => {
  try {
    const { description, value, type, userId } = req.body;
    const transactionRepository = getRepository(Transaction);

    const transaction = new Transaction();
    transaction.description = description;
    transaction.value = value;
    transaction.type = type;
    transaction.user = { id: userId } as any; // Associe a transação ao usuário

    const result = await transactionRepository.save(transaction);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar transação" });
  }
});

// Obter todas as transações
router.get("/", async (req, res) => {
  try {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter transações" });
  }
});

// Atualizar uma transação
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, value, type } = req.body;
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    transaction.description = description;
    transaction.value = value;
    transaction.type = type;

    const result = await transactionRepository.save(transaction);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar transação" });
  }
});

// Remover uma transação
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transactionRepository = getRepository(Transaction);

    const result = await transactionRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover transação" });
  }
});

// Obter saldo atual
router.get("/balance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactionRepository = getRepository(Transaction);

    const transactions = await transactionRepository.find({ where: { user: { id: userId } } });
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.value : acc - transaction.value;
    }, 0);

    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular saldo" });
  }
});

router.post('/', authenticateJWT, createTransaction);
router.get('/', authenticateJWT, getTransactions);
router.put('/:id', authenticateJWT, updateTransaction);
router.delete('/:id', authenticateJWT, deleteTransaction);
router.get('/balance/:userId', authenticateJWT, getBalance);

export default router;

