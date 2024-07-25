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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class AuthController {
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email } = req.body;
            try {
                const user = yield userRepository.findOneBy({ email });
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
exports.AuthController = AuthController;
