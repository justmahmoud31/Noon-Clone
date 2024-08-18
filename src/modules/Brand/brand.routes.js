import { Router } from "express";
import brandController from "./brand.controller.js";
const brandRouter = Router();
brandRouter.get('/',brandController.getAllBrands);
brandRouter.get('/getonebrand/:id',brandController.getOneBrand);
brandRouter.post('/addbrand',brandController.addBrand);
brandRouter.put('/editbrand/:id',brandController.editBrand);
brandRouter.delete('/deletebrand/:id',brandController.deleteBrand);
export default brandRouter;
