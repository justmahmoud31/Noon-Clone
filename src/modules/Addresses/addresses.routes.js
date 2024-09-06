import { Router } from "express";
import addresscontroller from "./addresses.controller.js";
import { accessKey, protectedRoutes } from "../auth/auth.controllers.js";
const addressRouter = Router();
addressRouter.patch('/addaddress', protectedRoutes, accessKey('user'), addresscontroller.addAddresses);
addressRouter.get('/', protectedRoutes, accessKey('user'), addresscontroller.addAddresses);
addressRouter.delete('/removeaddress/:id', protectedRoutes, accessKey('user'), addresscontroller.removeAddress);
export default addressRouter;