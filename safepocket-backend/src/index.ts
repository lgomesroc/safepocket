import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes"; // Adicione esta linha

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", routes);
app.use("/api/transactions", transactionRoutes); // Mova esta linha para fora do createConnection

// Inicialização do servidor
createConnection().then(() => {
  console.log("Conectado ao banco de dados");

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}).catch(error => console.log("Erro ao conectar ao banco de dados: ", error));
