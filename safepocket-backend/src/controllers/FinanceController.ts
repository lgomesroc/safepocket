import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Finance } from '../entities/Finance';

export class FinanceController {

  // Criar um novo registro de finanças
  async create(req: Request, res: Response): Promise<Response> {
    const financeRepository = getRepository(Finance);
    const { amount, description, date } = req.body;

    try {
      const finance = financeRepository.create({ amount, description, date });
      const result = await financeRepository.save(finance);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar o registro de finanças', error });
    }
  }

  // Obter todos os registros de finanças
  async getAll(req: Request, res: Response): Promise<Response> {
    const financeRepository = getRepository(Finance);

    try {
      const finances = await financeRepository.find();
      return res.status(200).json(finances);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter os registros de finanças', error });
    }
  }

  // Obter um registro de finanças por ID
  async getById(req: Request, res: Response): Promise<Response> {
    const financeRepository = getRepository(Finance);
    const { id } = req.params;

    // Converta o ID de string para número
    const idAsNumber = Number(id);

    try {
      // Realize a consulta usando o ID convertido
      const finance = await financeRepository.findOne({ where: { id: idAsNumber } });
      if (!finance) {
        return res.status(404).json({ message: 'Registro de finanças não encontrado' });
      }
      return res.status(200).json(finance);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter o registro de finanças', error });
    }
  }

  // Atualizar um registro de finanças por ID
  async update(req: Request, res: Response): Promise<Response> {
    const financeRepository = getRepository(Finance);
    const { id } = req.params;
    const { amount, description, date } = req.body;
  
    // Converter o ID de string para número
    const idAsNumber = Number(id);
  
    // Verificar se a conversão foi bem-sucedida
    if (isNaN(idAsNumber)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
  
    try {
      const finance = await financeRepository.findOne({ where: { id: idAsNumber } });
      if (!finance) {
        return res.status(404).json({ message: 'Registro de finanças não encontrado' });
      }
  
      finance.amount = amount;
      finance.description = description;
      finance.date = date;
  
      const result = await financeRepository.save(finance);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar o registro de finanças', error });
    }
  }
  

  // Deletar um registro de finanças por ID
  async delete(req: Request, res: Response): Promise<Response> {
    const financeRepository = getRepository(Finance);
    const { id } = req.params;

    try {
      const result = await financeRepository.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Registro de finanças não encontrado' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar o registro de finanças', error });
    }
  }
}
