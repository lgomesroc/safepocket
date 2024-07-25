import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';  // Certifique-se de instalar a biblioteca bcrypt
import jwt from 'jsonwebtoken';  // Certifique-se de instalar a biblioteca jsonwebtoken

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const { email, password, name } = req.body;

    // Verificar se o usuário já existe
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = userRepository.create({ email, password: hashedPassword, name });
    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Usuário autenticado com sucesso', token });
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const { email } = req.body;

    try {
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter o usuário', error });
    }
  }
}

const authController = new AuthController();
export { authController };
