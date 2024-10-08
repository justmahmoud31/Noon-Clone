import { Router } from "express";
import brandController from "./brand.controller.js";
import { singleFile } from "../../File Upload/fileupload.js";
import brandSchema from "./brand.validation.js";
import { isValid } from "../../middlewares/Validation.js";
const brandRouter = Router();
brandRouter.get('/',brandController.getAllBrands);
brandRouter.get('/getonebrand/:id',brandController.getOneBrand);
brandRouter.post('/addbrand',singleFile('logo','brands'),isValid(brandSchema),brandController.addBrand);
brandRouter.put('/editbrand/:id',singleFile('logo','brands'),brandController.editBrand);
brandRouter.delete('/deletebrand/:id',brandController.deleteBrand);
export default brandRouter;
