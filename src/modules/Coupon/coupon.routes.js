import { Router } from 'express';
import couponController from './coupon.controller.js';
import { accessKey, protectedRoutes } from '../auth/auth.controllers.js';


const couponRouter = Router();

couponRouter.get('/',couponController.getAllCoupons);
couponRouter.get('/getonecoupon/:id', couponController.getOneCoupon);
couponRouter.post('/addcoupon', protectedRoutes,accessKey('admin'),couponController.addCoupon);
couponRouter.put('/editcoupon/:id',  couponController.editCoupon);
couponRouter.delete('/deletecoupon/:id', couponController.deleteCoupon);

export default couponRouter;
