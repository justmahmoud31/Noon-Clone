import { Router } from "express";
import categoryController from "./category.controller.js";
const categoryrouter = Router();
categoryrouter.post('/addcategory',categoryController.addCategory)
categoryrouter.get('/',categoryController.getAllCategories)
categoryrouter.get('/oneCategory/:id',categoryController.getOneCategory)
categoryrouter.put('/updatecategory/:id',categoryController.editCategory)
categoryrouter.delete('/deletecategory/:id',categoryController.deleteCategory);
export default categoryrouter;