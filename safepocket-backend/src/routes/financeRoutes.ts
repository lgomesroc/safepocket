import { Router } from 'express';
import { FinanceController } from '../controllers/FinanceController';

const financeRoutes = Router();
const financeController = new FinanceController();

financeRoutes.post("/", financeController.create);
financeRoutes.get("/", financeController.getAll);
financeRoutes.get("/:id", financeController.getById);
financeRoutes.put("/:id", financeController.update);
financeRoutes.delete("/:id", financeController.delete);

export default financeRoutes;
