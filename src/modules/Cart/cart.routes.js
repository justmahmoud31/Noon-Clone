import { Router } from "express";
import cartController from "./cart.controller.js";
import { accessKey, protectedRoutes } from "../auth/auth.controllers.js";
const cartRouter = Router();
cartRouter.post('/addtocart',protectedRoutes,accessKey('user'),cartController.addToCart);
cartRouter.put('/updatecart/:id',protectedRoutes,accessKey('user'),cartController.updateCart);
cartRouter.get('/',protectedRoutes,accessKey('user'),cartController.getAllCart);
cartRouter.patch('/applycoupon',protectedRoutes,accessKey('user'),cartController.applyCoupon);
cartRouter.delete('/deleteitem/:id',protectedRoutes,accessKey('user'),cartController.deleteFromCart);
cartRouter.delete('/deletecart',protectedRoutes,accessKey('user'),cartController.deleteAllCart);
export default cartRouter;