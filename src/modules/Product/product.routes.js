import { Router } from "express";
import productController from "./product.controller.js";
import { mixedFiles } from "../../File Upload/fileupload.js";
const productRouter = Router();
productRouter.get('/', productController.getAllProducts);
productRouter.get('/getoneproduct/:id', productController.getOneProduct);
productRouter.get('/getbrandproduct/:id', productController.getBrandProduct)
productRouter.get('/getcategoryproduct/:id', productController.getCategoryProducts)
productRouter.post('/addproduct', mixedFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }], 'products'), productController.addProduct);
productRouter.put('/editproduct/:id',mixedFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }],'products'), productController.editProduct);
productRouter.delete('/deleteproduct/:id', productController.deleteProduct);
export default productRouter;
