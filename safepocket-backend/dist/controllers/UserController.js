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
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, password } = req.body;
            const userExists = yield userRepository.findOne({ where: { email } });
            if (userExists) {
                return res.sendStatus(409);
            }
            const user = userRepository.create({
                email,
                password: yield bcryptjs_1.default.hash(password, 8)
            });
            yield userRepository.save(user);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret", { expiresIn: "1d" });
            return res.json({
                user,
                token
            });
        });
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, password } = req.body;
            const user = yield userRepository.findOne({ where: { email } });
            if (!user) {
                return res.sendStatus(401);
            }
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res.sendStatus(401);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret", { expiresIn: "1d" });
            return res.json({
                user,
                token
            });
        });
    }
}
exports.default = new UserController();
