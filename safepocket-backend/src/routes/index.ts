import express from "express";
import { createConnection } from "typeorm";
import { authRouter } from "./routes/auth";

const app = express();
const PORT = 3000;

app.use(express.json());

createConnection().then(() => {
  console.log("Connected to the database");

  app.use("/api", authRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => console.log("Error connecting to the database", error));
