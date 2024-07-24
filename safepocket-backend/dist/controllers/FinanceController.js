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
exports.FinanceController = void 0;
const typeorm_1 = require("typeorm");
const Finance_1 = require("../entities/Finance");
class FinanceController {
    // Criar um novo registro de finanças
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const financeRepository = (0, typeorm_1.getRepository)(Finance_1.Finance);
            const { amount, description, date } = req.body;
            try {
                const finance = financeRepository.create({ amount, description, date });
                const result = yield financeRepository.save(finance);
                return res.status(201).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar o registro de finanças', error });
            }
        });
    }
    // Obter todos os registros de finanças
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const financeRepository = (0, typeorm_1.getRepository)(Finance_1.Finance);
            try {
                const finances = yield financeRepository.find();
                return res.status(200).json(finances);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao obter os registros de finanças', error });
            }
        });
    }
    // Obter um registro de finanças por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const financeRepository = (0, typeorm_1.getRepository)(Finance_1.Finance);
            const { id } = req.params;
            // Converta o ID de string para número
            const idAsNumber = Number(id);
            try {
                // Realize a consulta usando o ID convertido
                const finance = yield financeRepository.findOne({ where: { id: idAsNumber } });
                if (!finance) {
                    return res.status(404).json({ message: 'Registro de finanças não encontrado' });
                }
                return res.status(200).json(finance);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao obter o registro de finanças', error });
            }
        });
    }
    // Atualizar um registro de finanças por ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const financeRepository = (0, typeorm_1.getRepository)(Finance_1.Finance);
            const { id } = req.params;
            const { amount, description, date } = req.body;
            // Converter o ID de string para número
            const idAsNumber = Number(id);
            // Verificar se a conversão foi bem-sucedida
            if (isNaN(idAsNumber)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            try {
                const finance = yield financeRepository.findOne({ where: { id: idAsNumber } });
                if (!finance) {
                    return res.status(404).json({ message: 'Registro de finanças não encontrado' });
                }
                finance.amount = amount;
                finance.description = description;
                finance.date = date;
                const result = yield financeRepository.save(finance);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao atualizar o registro de finanças', error });
            }
        });
    }
    // Deletar um registro de finanças por ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const financeRepository = (0, typeorm_1.getRepository)(Finance_1.Finance);
            const { id } = req.params;
            try {
                const result = yield financeRepository.delete(id);
                if (result.affected === 0) {
                    return res.status(404).json({ message: 'Registro de finanças não encontrado' });
                }
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar o registro de finanças', error });
            }
        });
    }
}
exports.FinanceController = FinanceController;
