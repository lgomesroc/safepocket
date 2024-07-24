import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class AuthController {
  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const { email } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter o usuário', error });
    }
  }
}
