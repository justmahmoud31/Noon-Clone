import { Router } from 'express';
import couponController from './coupon.controller.js';
import { accessKey, protectedRoutes } from '../auth/auth.controllers.js';


const couponRouter = Router();

couponRouter.get('/',couponController.getAllCoupons);
couponRouter.get('/getonecoupon/:id', couponController.getOneCoupon);
couponRouter.post('/addcoupon', protectedRoutes,accessKey('admin'),couponController.addCoupon);
couponRouter.put('/editcoupon/:id',protectedRoutes,accessKey('admin'),couponController.editCoupon);
couponRouter.delete('/deletecoupon/:id',protectedRoutes,accessKey('admin'),couponController.deleteCoupon);

export default couponRouter;
