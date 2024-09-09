import { Router } from "express";
import orderController from "./order.controller.js";
import { accessKey, protectedRoutes } from "../auth/auth.controllers.js";
const orderRouter = Router();
orderRouter.post('/createorder/:id',protectedRoutes,accessKey('user'),orderController.createCashOrder);
orderRouter.get('/getuserorder',protectedRoutes,accessKey('user'),orderController.getUserOrder);
orderRouter.get('/getallorders',protectedRoutes,accessKey('admin'),orderController.getAllOrders);
export default orderRouter;