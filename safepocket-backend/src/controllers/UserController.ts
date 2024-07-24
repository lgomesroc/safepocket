import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { bcrypt } from "bcryptjs";
import { jwt } from "jsonwebtoken";
import { User } from "../models/User";

class UserController {
  async register(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = userRepository.create({
      email,
      password: await bcrypt.hash(password, 8)
    });

    await userRepository.save(user);

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    return res.json({
      user,
      token
    });
  }

  async authenticate(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    return res.json({
      user,
      token
    });
  }
}

export default new UserController();
