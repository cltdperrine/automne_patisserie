import { Router } from "express";
import authController from "./controllers/index.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.get("/sign-in", authController.signIn);

export default authRouter;
