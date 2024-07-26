import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./swagger"; // Importar a configuração do Swagger

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Configurar a rota para o Swagger

// Inicialização do servidor
createConnection()
  .then(() => {
    console.log("Conectado ao banco de dados");

    app.listen(3001, () => {
      console.log("Servidor rodando na porta 3001");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados: ", error);
  });
