import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';
import [ bcrypt } from 'bcryptjs';
import { User } from '../entities/User';

// Endpoint de registro de usuário
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = User.create({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: 'Usuário registrado com sucesso' });
};

// Endpoint de login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authenticateUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
