import { Router } from "express";
import userRoutes from "./userRoutes";
import financeRoutes from "./financeRoutes";
import authRoutes from "./authRoutes"; // Certifique-se de que esse arquivo existe e está correto
import transactionRoutes from "./transactionRoutes"; // Certifique-se de que esse arquivo existe e está correto

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/finances", financeRoutes);
routes.use('/auth', authRoutes);
routes.use('/transactions', transactionRoutes);

export default routes;
