"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerUi = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Controle de Finanças Pessoais',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de receitas e despesas.',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor local',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path para os arquivos de rotas onde as anotações estão localizadas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
