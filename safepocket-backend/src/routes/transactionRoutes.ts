import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Transaction } from "../entities/Transaction";
import { authenticateJWT } from "../middlewares/authMiddleware"; // Certifique-se de implementar e exportar authenticateJWT

const router = Router();

// Criar uma nova transação
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { description, amount, type, userId } = req.body;
    const transactionRepository = getRepository(Transaction);

    const transaction = new Transaction();
    transaction.description = description;
    transaction.amount = amount;
    transaction.user = { id: userId } as any; // Associe a transação ao usuário

    // Se type for necessário, você deve adicionar um campo no modelo de Transaction
    // transaction.type = type;

    const result = await transactionRepository.save(transaction);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar transação" });
  }
});

// Obter todas as transações
router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter transações" });
  }
});

// Atualizar uma transação
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, amount, type } = req.body;
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({ where: { id: Number(id) } });
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    transaction.description = description;
    transaction.amount = amount;
    // Se type for necessário, adicione ao modelo e defina aqui
    // transaction.type = type;

    const result = await transactionRepository.save(transaction);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar transação" });
  }
});

// Remover uma transação
router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transactionRepository = getRepository(Transaction);

    const result = await transactionRepository.delete({ id: Number(id) });
    if (result.affected === 0) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover transação" });
  }
});

// Obter saldo atual
router.get("/balance/:userId", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const transactionRepository = getRepository(Transaction);

    const transactions = await transactionRepository.find({
      where: { user: { id: Number(userId) } },
    });

    const balance = transactions.reduce((acc, transaction) => {
      // Se type for necessário, adicione ao modelo e defina aqui
      // return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
      return acc; // Ajuste conforme necessário
    }, 0);

    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular saldo" });
  }
});

export default router;
