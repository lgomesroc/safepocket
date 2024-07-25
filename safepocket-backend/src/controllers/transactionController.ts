import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';

// Criar uma nova transação
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, type, userId } = req.body;
    const transactionRepository = getRepository(Transaction);

    const transaction = new Transaction();
    transaction.description = description;
    transaction.amount = amount;
    transaction.user = { id: userId } as any; // Associe a transação ao usuário

    const result = await transactionRepository.save(transaction);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar transação" });
  }
};

// Obter todas as transações
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter transações" });
  }
};

// Atualizar uma transação
export const updateTransaction = async (req: Request, res: Response) => {
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

    const result = await transactionRepository.save(transaction);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar transação" });
  }
};

// Remover uma transação
export const deleteTransaction = async (req: Request, res: Response) => {
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
};

// Obter saldo atual
export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const transactionRepository = getRepository(Transaction);

    const transactions = await transactionRepository.find({
      where: { user: { id: Number(userId) } },
    });

    const balance = transactions.reduce((acc, transaction) => {
      return transaction.amount; // Ajuste o cálculo se necessário
    }, 0);

    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular saldo" });
  }
};
