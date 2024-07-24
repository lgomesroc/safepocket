import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

// Registro de usuário
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login de usuário
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export { authRouter };
