import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";

createConnection().then(async connection => {
  const app = express();
  app.use(express.json());

  // Registrar as rotas
  app.use("/api", routes);

  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
}).catch(error => console.log(error));
