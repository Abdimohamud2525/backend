import Express from "express";
import { LoginUser, registerUser } from "../controlis/userConrollers.js";
import {
  validateUserLogin,
  validateUserRegistration,
} from "../validatord/userValidator.js";

const userRouter = Express.Router();

userRouter.post("/register-user", validateUserRegistration, registerUser);
userRouter.post("/login-user", validateUserLogin, LoginUser);

export default userRouter;
