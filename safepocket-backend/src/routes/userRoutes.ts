import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/register", UserController.register);
router.post("/authenticate", UserController.authenticate);

export default router;
