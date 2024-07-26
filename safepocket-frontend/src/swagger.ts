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
      url: 'http://localhost:3001/api',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas onde as anotações OpenAPI estão localizadas
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
