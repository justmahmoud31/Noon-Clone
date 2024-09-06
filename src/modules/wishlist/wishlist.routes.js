import { Router } from "express";
import wishlistController from "./wishlist.controller.js";
import { accessKey, protectedRoutes } from "../auth/auth.controllers.js";
const wishlistRouter = Router();
wishlistRouter.patch('/addtowishlist',protectedRoutes,accessKey('user'),wishlistController.addWishlist);
wishlistRouter.get('/',protectedRoutes,accessKey('user'),wishlistController.getAllWishlist);
wishlistRouter.delete('/removewishlist/:id',protectedRoutes,accessKey('user'),wishlistController.removeWishlist);
export default wishlistRouter;