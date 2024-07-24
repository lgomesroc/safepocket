import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", routes);

// Inicialização do servidor
createConnection().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}).catch(error => console.log(error));

// Configuração do TypeORM
createConnection().then(() => {
  console.log("Conectado ao banco de dados");
  app.use("/api/transactions", transactionRoutes);

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}).catch(error => console.log("Erro ao conectar ao banco de dados: ", error));
