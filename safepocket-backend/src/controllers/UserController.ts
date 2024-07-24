import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async register(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { name, email, password, photo } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({ name, email, password: hashedPassword, photo });
    await userRepository.save(user);

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });

    return res.json({ user, token });
  }
}

export default new UserController();
