"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt")); // Certifique-se de instalar a biblioteca bcrypt
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Certifique-se de instalar a biblioteca jsonwebtoken
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, password, name } = req.body;
            // Verificar se o usuário já existe
            const userExists = yield userRepository.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }
            // Criptografar a senha
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Criar novo usuário
            const newUser = userRepository.create({ email, password: hashedPassword, name });
            yield userRepository.save(newUser);
            return res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, password } = req.body;
            // Verificar se o usuário existe
            const user = yield userRepository.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            // Verificar a senha
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            // Gerar token JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
            return res.status(200).json({ message: 'Usuário autenticado com sucesso', token });
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email } = req.body;
            try {
                const user = yield userRepository.findOne({ where: { email } });
                if (!user) {
                    return res.status(404).json({ message: 'Usuário não encontrado' });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao obter o usuário', error });
            }
        });
    }
}
const authController = new AuthController();
exports.authController = authController;
