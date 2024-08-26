import { Router } from "express";
import categoryController from "./category.controller.js";
import { singleFile } from "../../File Upload/fileupload.js";
const categoryrouter = Router();
categoryrouter.post('/addcategory',singleFile('image','categories'),categoryController.addCategory)
categoryrouter.get('/',categoryController.getAllCategories)
categoryrouter.get('/oneCategory/:id',categoryController.getOneCategory)
categoryrouter.put('/updatecategory/:id',singleFile('image','categories'),categoryController.editCategory)
categoryrouter.delete('/deletecategory/:id',categoryController.deleteCategory);
export default categoryrouter;