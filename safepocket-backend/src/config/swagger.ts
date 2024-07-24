// src/config/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

const swaggerSpec = swaggerJSDoc(options);

export default {
  swaggerUi,
  swaggerSpec,
};
