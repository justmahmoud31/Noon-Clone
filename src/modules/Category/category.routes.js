import { Router } from "express";
import categoryController from "./category.controller.js";
const router = Router();
router.post('/addcategory',categoryController.addCategory)
router.get('/',categoryController.getAllCategories)
router.get('/oneCategory/:id',categoryController.getOneCategory)
router.put('/updatecategory/:id',categoryController.editCategory)
router.delete('/deletecategory/:id',categoryController.deleteCategory);
export default router;