import { Router } from "express";
import userRoutes from "./userRoutes";
import financeRoutes from "./financeRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/finances", financeRoutes);

export default routes;
