import { Router } from "express";
import {accessKey, changeuserPassword, protectedRoutes, signup} from './auth.controllers.js';
import {login} from './auth.controllers.js';
import { checkMail } from "../../middlewares/checkMail.js";
const authRouter = Router();
authRouter.post('/signup',checkMail,signup)
authRouter.post('/login',login)
authRouter.patch('/changepassword/:id',protectedRoutes,accessKey('user','admin'),changeuserPassword);
export default authRouter;