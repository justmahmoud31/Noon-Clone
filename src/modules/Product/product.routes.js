import { Router } from "express";
import productController from "./product.controller.js";
const productRouter = Router();
productRouter.get('/',productController.getAllProducts);
productRouter.get('/getoneproduct/:id',productController.getOneProduct);
productRouter.get('/getbrandproduct/:id',productController.getBrandProduct)
productRouter.get('/getcategoryproduct/:id',productController.getCategoryProducts)
productRouter.post('/addproduct',productController.addProduct);
productRouter.put('/editproduct/:id',productController.editProduct);
productRouter.delete('/deleteproduct/:id',productController.deleteProduct);
export default productRouter;
